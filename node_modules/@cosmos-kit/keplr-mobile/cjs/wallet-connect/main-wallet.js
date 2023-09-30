"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeplrMobileWallet = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
class KeplrMobileWallet extends walletconnect_1.WCWallet {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainKeplrMobile, client_1.KeplrClient);
        this.preferredEndpoints = preferredEndpoints;
    }
}
exports.KeplrMobileWallet = KeplrMobileWallet;
//# sourceMappingURL=main-wallet.js.map