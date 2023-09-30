export const keplrStandardSignAndBroadcast = (
  { address, keplr, msgs, chainId, memo = "" }: KeplrSignData,
  statusCallback: (statusName: I18nKey) => void = () => undefined
): BroadcastResponse =>
  pipe(
    TE.of({ keplr, chainId }),
    TETap(() => statusCallback("signAndBroadcastStatus.keplrEnable")),
    TE.chainW(enableKeplr),
    TETap(() => statusCallback("signAndBroadcastStatus.getSigner")),
    TE.chainW(() => getKeplrSigner({ keplr, chainId })),
    TETap(() => statusCallback("signAndBroadcastStatus.connectingToChain")),
    TE.chainW((signer) =>
      pipe(
        new Registry(defaultRegistryTypes),
        TE.of,
        TE.map((registry) => {
          registry.register(
            "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation",
            MsgCancelUnbondingDelegation
          );
          registry.register(
            "/cosmwasm.wasm.v1.MsgExecuteContract",
            MsgExecuteContract
          );
          return registry;
        }),
        TE.chain((registry) =>
          pipe(
            fetchCSDKVersion(chainId),
            TE.mapLeft(
              createI18nError("authentication.csdkVersionFetchFailed")
            ),
            TE.chain((csdkVersion) =>
              TE.tryCatch(
                () =>
                  SigningStargateClient.connectWithSigner(
                    chainSettings[chainId].rpc,
                    signer,
                    {
                      registry,
                      // @ts-ignore tolerate the authz polyfill types
                      aminoTypes:
                        chainId !== "secret-4" &&
                        (csdkVersion.includes("0.44") ||
                          csdkVersion.includes("0.45"))
                          ? authzPolyfillAminoTypes
                          : customAminoTypes,
                      gasPrice: GasPrice.fromString(
                        chainSettings[chainId].gasPrice
                      ),
                      // accountParser,
                    }
                  ),
                createI18nError("authentication.stargateClientUnavailable")
              )
            )
          )
        )
      )
    ),
    TETap(() => statusCallback("signAndBroadcastStatus.simulating")),
    TE.chainW((client) =>
      TE.tryCatch(() => {
        console.log("simulating", { address, msgs, memo });
        return client
          .simulate(address, msgs, memo)
          .then((gas) => ({ gas, client }));
      }, createI18nError("authentication.simulationError"))
    ),
    TETap(() =>
      statusCallback("signAndBroadcastStatus.signingAndBroadcasting")
    ),
    TE.chainW(({ gas, client }) =>
      TE.tryCatch(() => {
        console.log("singing and broadcasting", {
          client,
          address,
          msgs,
          memo,
        });
        return client.signAndBroadcast(
          address,
          msgs,
          {
            gas: Math.ceil(gas * 2).toString(),
            amount: [
              {
                amount: (
                  gas *
                  2 *
                  Number(
                    flatTokenStringToCoin(chainSettings[chainId].gasPrice)
                      ?.amount
                  )
                ).toString(),
                denom: chainSettings[chainId].baseDenom,
              },
            ],
          },
          memo
        );
      }, createI18nError("authentication.failedToBroadcastKeplr"))
    ),
    TE.filterOrElseW(
      (txResp) => txResp.code === 0,
      (tx) => ["authentication.broadcastFailed", new Error(tx.rawLog)] as const
    ),
    TE.map((tx) => {
      console.log("tx", tx);
      return { txHash: tx.transactionHash };
    })
  );
