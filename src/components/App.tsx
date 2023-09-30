import React, { useState, useEffect } from "react";
import { SigningStargateClient } from "@cosmjs/stargate";
import { useWallet, ChainProvider } from "@cosmos-kit/react";
import type { AppProps } from 'next/app';

// Cosmos configuration
const COSMOS_CONFIG = {
  chain_id: "cosmoshub-4",
  chainName: "Cosmos Hub 4",
  rpc: "https://rpc.cosmos.directory",
  rest: "https://lcd.cosmos.directory",
  bech32Prefix: {
    AccAddr: "cosmos",
    AccPub: "cosmospub",
    ValAddr: "cosmosvaloper",
    ValPub: "cosmosvaloperpub",
    ConsAddr: "cosmosvalcons",
    ConsPub: "cosmosvalconspub",
  },
  coinType: 118,
};

export function LSMControl({ Component, pageProps }: AppProps) {
  return (
    <ChainProvider /* Insert your ChainProvider properties here */>
      <Component {...pageProps} />
    </ChainProvider>
  );
}

function LSMToggle({ Component, pageProps }: AppProps) {
  const wallet: any = useWallet();
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window !== "undefined" && window.keplr) {
        await wallet.activateWalletProvider("keplr");
        await window.keplr.experimentalSuggestChain({
          chain_id: COSMOS_CONFIG.chain_id,
          chainName: COSMOS_CONFIG.chainName,
          rpc: COSMOS_CONFIG.rpc,
          rest: COSMOS_CONFIG.rest,
          bip44: {
            coinType: COSMOS_CONFIG.coinType,
          },
          bech32Config: COSMOS_CONFIG.bech32Prefix,
          features: ["stargate", "ibc-transfer"],
        });
        await wallet.switchChain(COSMOS_CONFIG.chain_id);
      } else {
        setResult("Please install Keplr wallet extension");
      }
    } catch (error: unknown) {
      console.error("Error connecting to Keplr", error);
      setResult((error as Error).message);
    }
  };

  const executeFunction = async (msgType: string) => {
    try {
      const signer = window.getOfflineSigner(COSMOS_CONFIG.chain_id);
      const client = await SigningStargateClient.connectWithSigner(COSMOS_CONFIG.rpc, signer);
  
      const msg = {
        typeUrl: msgType,
        value: {
          delegatorAddress: wallet.address,
        },
      };
  
      const response = await client.signAndBroadcast(wallet.wallet?.address || "", [msg], {
        amount: [{ denom: "uatom", amount: "2000" }],
        gas: "200000",
      });
      setResult(JSON.stringify(response, null, 2));
    } catch (error: unknown) {
      setResult((error as Error).message);
    }
  };

  return (
    <div>
      <button onClick={() => executeFunction("/cosmos.staking.v1beta1.MsgDisableTokenizeShares")}>
        Disable LSM
      </button>
      <button onClick={() => executeFunction("/cosmos.staking.v1beta1.MsgEnableTokenizeShares")}>
        Enable LSM
      </button>
      <div>{result}</div>
    </div>
  );
}
