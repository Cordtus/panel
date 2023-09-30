import { ICON } from '../constant';
export const keplrExtensionInfo = {
    name: 'keplr-extension',
    prettyName: 'Keplr',
    logo: ICON,
    mode: 'extension',
    // In the Keplr Mobile in-app browser, Keplr is available in window.keplr,
    // similar to the extension on a desktop browser. For this reason, we must
    // check what mode the window.keplr client is in once it's available.
    mobileDisabled: () => !(typeof document !== 'undefined' &&
        document.readyState === 'complete' &&
        window.keplr &&
        window.keplr.mode === 'mobile-web'),
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['keplr_keystorechange'],
    downloads: [
        {
            device: 'desktop',
            browser: 'chrome',
            link: 'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en',
        },
        {
            device: 'desktop',
            browser: 'firefox',
            link: 'https://addons.mozilla.org/en-US/firefox/addon/keplr/',
        },
        {
            link: 'https://www.keplr.app/download',
        },
    ],
};
//# sourceMappingURL=registry.js.map