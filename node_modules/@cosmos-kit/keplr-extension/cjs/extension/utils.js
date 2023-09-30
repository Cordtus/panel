"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeplrFromExtension = void 0;
const core_1 = require("@cosmos-kit/core");
const getKeplrFromExtension = async () => {
    if (typeof window === 'undefined') {
        return void 0;
    }
    const keplr = window.keplr;
    if (keplr) {
        return keplr;
    }
    if (document.readyState === 'complete') {
        if (keplr) {
            return keplr;
        }
        else {
            throw core_1.ClientNotExistError;
        }
    }
    return new Promise((resolve, reject) => {
        const documentStateChange = (event) => {
            if (event.target &&
                event.target.readyState === 'complete') {
                if (keplr) {
                    resolve(keplr);
                }
                else {
                    reject(core_1.ClientNotExistError.message);
                }
                document.removeEventListener('readystatechange', documentStateChange);
            }
        };
        document.addEventListener('readystatechange', documentStateChange);
    });
};
exports.getKeplrFromExtension = getKeplrFromExtension;
//# sourceMappingURL=utils.js.map