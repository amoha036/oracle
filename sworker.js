import { to_image_name } from './lib.js';

const CACHE_NAME = "oracle_v1";

const precache = async (resources) => {
  const cache = await caches.open(CACHE_NAME); 
  await cache.addAll(resources);
}

const fetchCache = async (request) => {
  const cached = await caches.match(request.clone());
  if (cached) {
    return cached;
  }

  return fetch(request);
}

const get_image_names = () => {
  const total = 101;
  const image_names = [];
  for (let n = 0; n < total; n++) {
    image_names.push(`./${to_image_name(n)}`);
  }
  return image_names;
};

self.addEventListener("install", (e) => {
  console.info("service worker installation complete");
  console.info("precaching resources");
  e.waitUntil(precache(get_image_names()));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(fetchCache(e.request));
});
