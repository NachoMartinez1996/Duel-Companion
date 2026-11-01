/*
 * Duel Companion - Service Worker
 * Cuando publiques una actualización importante, cambiá CACHE_NAME (v1 -> v2).
 */
const CACHE_NAME = "duel-companion-v1";
const APP_BASE = new URL("./", self.registration.scope);
const APP_SHELL = [
  APP_BASE.href,
  new URL("index.html", APP_BASE).href,
  new URL("manifest.webmanifest", APP_BASE).href,
  new URL("icons/icon-192.png", APP_BASE).href,
  new URL("icons/icon-512.png", APP_BASE).href
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("duel-companion-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const requestURL = new URL(request.url);
  if (requestURL.origin !== APP_BASE.origin || !requestURL.href.startsWith(APP_BASE.href)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const responseCopy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseCopy));
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;
          return caches.match(new URL("index.html", APP_BASE).href);
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseCopy));
        }
        return response;
      });
    })
  );
});
