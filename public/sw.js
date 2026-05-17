const CACHE_NAME = "shikoku-japanese-v10";

const scopePath = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const withBase = (path) => `${scopePath}${path}`;

const CORE_ASSETS = [
  withBase("/"),
  withBase("/index.html"),
  withBase("/manifest.webmanifest"),
  withBase("/apple-touch-icon.png"),
  withBase("/icon-192.png"),
  withBase("/icon-512.png"),
  withBase("/assets/logo/app-logo.png"),
  withBase("/assets/backgrounds/home-bg.png"),
  withBase("/assets/backgrounds/learning-bg.png"),
  withBase("/assets/audio/background-music.mp3"),
  withBase("/assets/panels/training-card.png"),
  withBase("/assets/panels/analysis-panel.png"),
  withBase("/assets/panels/hint-panel.png"),
  withBase("/assets/buttons/small-round.png"),
  withBase("/assets/buttons/function-medium.png"),
  withBase("/assets/buttons/rating-unknown.png"),
  withBase("/assets/buttons/rating-fuzzy.png"),
  withBase("/assets/buttons/rating-known.png"),
  withBase("/assets/icons/back.png"),
  withBase("/assets/icons/hint.png"),
  withBase("/assets/icons/play.png"),
  withBase("/assets/icons/show-sentence.png"),
  withBase("/assets/icons/show-meaning.png"),
  withBase("/assets/icons/listening-center.png"),
  ...Array.from({ length: 25 }, (_, index) => {
    const id = String(index + 1).padStart(4, "0");
    return withBase(`/assets/audio/sentences/${id}.wav`);
  }),
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  if (event.request.headers.has("range")) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(withBase("/index.html")));
    }),
  );
});
