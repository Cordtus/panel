import { SigningStargateClient } from "@cosmjs/proto-signing";
import { createI18nError } from "@cosmjs/launchpad";
// Define a function called getKeplrSigner that takes an object with two properties as its argument
export const getKeplrSigner = ({
  keplr, // A Keplr object
  chainId, // An AvailableChain object
}: {
  keplr: Keplr;
  chainId: AvailableChain;
}) =>
  // Use the fp-ts library to create a TaskEither object that attempts to get an offline signer from Keplr
  TE.tryCatch(
    () => keplr.getOfflineSignerAuto(chainId),
    // If the above function fails, create an i18n error with the message "authentication.keplrSignerUnavailable"
    createI18nError("authentication.keplrSignerUnavailable")
  );