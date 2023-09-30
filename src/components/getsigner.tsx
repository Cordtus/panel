export const getKeplrSigner = ({
  keplr,
  chainId,
}: {
  keplr: Keplr;
  chainId: AvailableChain;
}) =>
  TE.tryCatch(
    () => keplr.getOfflineSignerAuto(chainId),
    createI18nError("authentication.keplrSignerUnavailable")
  );
