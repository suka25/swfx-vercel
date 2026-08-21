import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 60, // 1 menit
  checkperiod: 120,
});

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export function getCache<T>(key: string): T | null {
  const entry = cache.get<CacheEntry<T>>(key);
  if (!entry) return null;
  return entry.data;
}

export function setCache<T>(key: string, data: T, ttl: number = 60): void {
  cache.set(key, { data, timestamp: Date.now() }, ttl);
}

export function clearCache(key?: string): void {
  if (key) {
    cache.del(key);
  } else {
    cache.flushAll();
  }
}

export function getCacheStats() {
  return cache.getStats();
}
