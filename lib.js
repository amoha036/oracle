export const to_image_name = (tarot) => Number.parseInt(tarot) === 0 ? 'j-.jpg' : `j-${tarot}.jpg`;

const register = async () => {
  try {
    const scope = window.location.pathname; // This assumes the page will be an index.html page.
    const registration = await navigator.serviceWorker.register("sworker.js", { scope, type: "module" });
    switch (true) {
      case !!registration.installing: 
        console.info("service worker installing");
        break;
      case !!registration.waiting:
        console.info("service worker waiting");
        break;
      case !!registration.active:
        console.info("service worker active");
        break;
      default:
        console.warn("no service worker status information found");
    }
  } catch (e) {
    console.error(`service worker installation failed with ${e}`)
  }
}

export const install = () => {
  if ("serviceWorker" in navigator) {
    console.info("precaching available");
    register();
  } else {
    console.warn("precaching not available");
  }
}

export const location_to_tarot = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("t");
}
