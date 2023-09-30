import { getIsLazy } from './endpoint';
export function convertChain(chain, assetLists, signerOptions, preferredEndpoints, isLazy, logger) {
    const assetList = assetLists.find((list) => list.chain_name === chain.chain_name);
    return {
        name: chain.chain_name,
        chain,
        assetList,
        clientOptions: {
            stargate: signerOptions?.stargate?.(chain),
            signingStargate: signerOptions?.signingStargate?.(chain),
            signingCosmwasm: signerOptions?.signingCosmwasm?.(chain),
            preferredSignType: signerOptions?.preferredSignType?.(chain) || 'amino',
        },
        preferredEndpoints: {
            ...preferredEndpoints,
            isLazy: getIsLazy(isLazy, preferredEndpoints?.isLazy, void 0, void 0, logger),
        },
    };
}
//# sourceMappingURL=convert.js.map