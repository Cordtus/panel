import { MainWalletBase } from '@cosmos-kit/core';
import { ChainKeplrExtension } from './chain-wallet';
import { KeplrClient } from './client';
import { getKeplrFromExtension } from './utils';
export class KeplrExtensionWallet extends MainWalletBase {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, ChainKeplrExtension);
        this.preferredEndpoints = preferredEndpoints;
    }
    async initClient() {
        this.initingClient();
        try {
            const keplr = await getKeplrFromExtension();
            this.initClientDone(keplr ? new KeplrClient(keplr) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
//# sourceMappingURL=main-wallet.js.map