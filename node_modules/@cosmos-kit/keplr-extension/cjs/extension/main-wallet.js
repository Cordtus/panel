"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeplrExtensionWallet = void 0;
const core_1 = require("@cosmos-kit/core");
const chain_wallet_1 = require("./chain-wallet");
const client_1 = require("./client");
const utils_1 = require("./utils");
class KeplrExtensionWallet extends core_1.MainWalletBase {
    constructor(walletInfo, preferredEndpoints) {
        super(walletInfo, chain_wallet_1.ChainKeplrExtension);
        this.preferredEndpoints = preferredEndpoints;
    }
    async initClient() {
        this.initingClient();
        try {
            const keplr = await (0, utils_1.getKeplrFromExtension)();
            this.initClientDone(keplr ? new client_1.KeplrClient(keplr) : undefined);
        }
        catch (error) {
            this.initClientError(error);
        }
    }
}
exports.KeplrExtensionWallet = KeplrExtensionWallet;
//# sourceMappingURL=main-wallet.js.map