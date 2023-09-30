// Define a constant called kWindow that is a Window object with additional properties from the KeplrWin interface and an optional property called leap of type Keplr
const kWindow: Window & KeplrWin & { leap?: Keplr } = window;

// Define a function called getKeplrFromWindow that returns a Promise that resolves to a Keplr object
export const getKeplrFromWindow: () => Promise<Keplr> = async () => {
  // If the keplr property exists on the kWindow object, return it immediately
  if (kWindow.keplr) {
    return kWindow.keplr;
  }

  // If the document is already in the "complete" state, check if the keplr property exists on the kWindow object and return it if it does
  if (document.readyState === "complete") {
    if (typeof kWindow.keplr === "undefined") {
      throw new Error("keplr undefined");
    } else {
      return kWindow.keplr;
    }
  }

  // If the document is not yet in the "complete" state, return a Promise that resolves when the document is fully loaded
  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        if (typeof kWindow.keplr === "undefined") {
          throw new Error("keplr undefined");
        } else {
          resolve(kWindow.keplr);
        }
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};