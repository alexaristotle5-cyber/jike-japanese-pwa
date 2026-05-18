const cacheName = "shikoku-japanese-v11";
const baseUrl = import.meta.env.BASE_URL;

function appUrl(path = ""): string {
  return new URL(`${baseUrl}${path}`, window.location.origin).toString();
}

async function primeLoadedAssets(): Promise<void> {
  if (!("caches" in window)) {
    return;
  }

  const urls = [
    appUrl(),
    ...Array.from(document.querySelectorAll<HTMLScriptElement>("script[src]")).map((script) => script.src),
    ...Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href]')).map((link) => link.href),
  ];

  const cache = await caches.open(cacheName);
  await cache.addAll([...new Set(urls)]);
}

export function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(appUrl("sw.js"), { scope: appUrl() })
      .then((registration) => {
        void registration.update();
        return primeLoadedAssets();
      })
      .catch(() => {
        // The app still works online if service worker registration is blocked.
      });
  });
}
