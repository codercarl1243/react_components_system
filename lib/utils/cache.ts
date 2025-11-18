/**
 * A Least Recently Used (LRU) cache implementation.
 * 
 * Items are automatically evicted when the cache reaches its maximum size,
 * removing the least recently accessed item. Accessing an item (via get or set)
 * marks it as recently used.
 * 
 * @template K - The type of keys in the cache
 * @template V - The type of values in the cache
 * 
 * @example
 * ```typescript
 * const cache = new LRUCache<string, number>(3);
 * cache.set('a', 1);
 * cache.set('b', 2);
 * cache.set('c', 3);
 * cache.set('d', 4); // Evicts 'a' (least recently used)
 * cache.get('b');    // Marks 'b' as most recently used
 * ```
 */
export class LRUCache<K, V> {
    private cache = new Map<K, V>();

    /**
     * Creates a new LRU cache with the specified maximum size.
     * 
     * @param maxSize - Maximum number of items the cache can hold (must be at least 1)
     * @throws {Error} If maxSize is less than 1
     */
    constructor(private maxSize: number) {
        if (maxSize < 1) {
            throw new Error('maxSize must be at least 1');
        }
    }

    /**
     * Retrieves a value from the cache and marks it as recently used.
     * 
     * @param key - The key to retrieve
     * @returns The cached value, or undefined if the key doesn't exist
     */
    get(key: K): V | undefined {
        const value = this._get(key);
        if (value === undefined) return undefined;
        
        this._markAsRecentlyUsed(key, value);
        return value;
    }

    /**
     * Adds or updates a value in the cache. If the cache is full, evicts the
     * least recently used item. The added/updated item is marked as most recently used.
     * 
     * @param key - The key to set
     * @param value - The value to store
     */
    set(key: K, value: V): void {
        if (this.has(key)) {
            this._delete(key);
        } else if (this.size >= this.maxSize) {
            this._evictLRU();
        }
        this._set(key, value);
    }

    /**
     * Checks if a key exists in the cache without affecting LRU order.
     * 
     * @param key - The key to check
     * @returns True if the key exists, false otherwise
     */
    has(key: K): boolean {
        return this.cache.has(key);
    }

    /**
     * Removes an item from the cache.
     * 
     * @param key - The key to delete
     * @returns True if the item was deleted, false if it didn't exist
     */
    delete(key: K): boolean {
        return this.cache.delete(key);
    }

    /**
     * Removes all items from the cache.
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Gets the current number of items in the cache.
     */
    get size(): number {
        return this.cache.size;
    }

    /**
     * Gets the maximum capacity of the cache.
     */
    get capacity(): number {
        return this.maxSize;
    }

    /**
     * Returns all keys in LRU order (least recently used first).
     * 
     * @returns Array of keys ordered from least to most recently used
     */
    keys(): K[] {
        return Array.from(this.cache.keys());
    }

    /**
     * Returns all values in LRU order (least recently used first).
     * 
     * @returns Array of values ordered from least to most recently used
     */
    values(): V[] {
        return Array.from(this.cache.values());
    }

    /**
     * Returns all entries in LRU order (least recently used first).
     * 
     * @returns Array of [key, value] tuples ordered from least to most recently used
     */
    entries(): [K, V][] {
        return Array.from(this.cache.entries());
    }

    /** Retrieves a value directly from the underlying Map without updating LRU order. */
    private _get(key: K): V | undefined {
        return this.cache.get(key);
    }

    /** Adds a value directly to the underlying Map. */
    private _set(key: K, value: V): void {
        this.cache.set(key, value);
    }

    /** Removes a value directly from the underlying Map. */
    private _delete(key: K): boolean {
        return this.cache.delete(key);
    }

    /** Moves an item to the end of the cache (marks as most recently used). */
    private _markAsRecentlyUsed(key: K, value: V): void {
        this._delete(key);
        this._set(key, value);
    }

    /** Removes the least recently used item from the cache. */
    private _evictLRU(): void {
        const oldestKey = this.cache.keys().next().value;
        if (oldestKey === undefined) return;
        this._delete(oldestKey);
    }
}