import { WCWallet } from '@cosmos-kit/walletconnect';
import { ChainKeplrMobile } from './chain-wallet';
import { KeplrClient } from './client';
export class KeplrMobileWallet extends WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, ChainKeplrMobile, KeplrClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
//# sourceMappingURL=main-wallet.js.map