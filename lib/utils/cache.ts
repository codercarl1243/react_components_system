import { isNullish } from "@/lib/utils/guards";

export class LRUCache<K, V> {
    private cache = new Map<K, V>();

    constructor(private maxSize: number) {
        if (maxSize < 1) {
            throw new Error('maxSize must be at least 1');
        }
    }

    get(key: K): V | undefined {

        const value = this._get(key);

        if (isNullish(value)) return undefined;

        this._markAsRecentlyUsed(key, value);

        return value;
    }

    set(key: K, value: V): void {
        if (this.has(key)) {
            this._delete(key);
        } else if (this.size >= this.maxSize) {
            this._evictLRU();
        }
        this._set(key, value);
    }

    has(key: K): boolean {
        return this.cache.has(key);
    }

    delete(key: K): boolean {
        return this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    get size(): number {
        return this.cache.size;
    }

    get capacity(): number {
        return this.maxSize;
    }

    // Get all keys in LRU order (least recent first)
    keys(): K[] {
        return Array.from(this.cache.keys());
    }

    // Get all values in LRU order (least recent first)
    values(): V[] {
        return Array.from(this.cache.values());
    }

    // Get all entries in LRU order (least recent first)
    entries(): [K, V][] {
        return Array.from(this.cache.entries());
    }

    private _get(key: K): V | undefined {
        return this.cache.get(key);
    }

    private _set(key: K, value: V): void {
        this.cache.set(key, value);
    }

    private _delete(key: K): boolean {
        return this.cache.delete(key);
    }

    private _markAsRecentlyUsed(key: K, value: V): void {
        this._delete(key);
        this._set(key, value);
    }

    private _evictLRU(): void {
        const firstKey = this.cache.keys().next().value;
        if (isNullish(firstKey)) return;

        this._delete(firstKey);
    }
}