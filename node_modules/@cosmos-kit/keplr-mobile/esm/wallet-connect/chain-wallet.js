import { ChainWC } from '@cosmos-kit/walletconnect';
import { KeplrClient } from './client';
export class ChainKeplrMobile extends ChainWC {
    constructor(walletInfo, chainInfo) {
        super(walletInfo, chainInfo, KeplrClient);
    }
}
//# sourceMappingURL=chain-wallet.js.map