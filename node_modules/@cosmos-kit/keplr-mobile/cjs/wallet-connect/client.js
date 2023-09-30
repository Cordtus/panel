"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeplrClient = void 0;
const walletconnect_1 = require("@cosmos-kit/walletconnect");
class KeplrClient extends walletconnect_1.WCClient {
    constructor(walletInfo) {
        super(walletInfo);
    }
}
exports.KeplrClient = KeplrClient;
//# sourceMappingURL=client.js.map