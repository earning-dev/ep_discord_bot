import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

export class Cache {
  public readonly cacheName: string;

  private readonly cacheDir: string;
  private readonly cacheFile: string;

  constructor(cacheName: string) {
    this.cacheName = cacheName;

    this.cacheDir = resolve('.cache');
    this.cacheFile = join(this.cacheDir, `${this.cacheName}.cache`);

    // If the cache directory doesn't exist, create it
    if (!existsSync(this.cacheDir)) mkdirSync(this.cacheDir);

    // If the cache file doesn't exist, create it
    if (!existsSync(this.cacheFile)) writeFileSync(this.cacheFile, '{}', 'utf-8');
  }

  set<T extends Record<any, any>>(object: T) {
    const serializedCache = JSON.stringify(object, null, 0);
    writeFileSync(this.cacheFile, serializedCache, 'utf-8');
  }

  get<T>(): T | null {
    const serializedCache = readFileSync(this.cacheFile, 'utf-8');

    try {
      const cachedData = JSON.parse(serializedCache);
      return cachedData;
    } catch (error) {
      return null;
    }
  }
}
