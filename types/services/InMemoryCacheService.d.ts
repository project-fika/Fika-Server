import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class InMemoryCacheService {
    protected cloner: ICloner;
    protected cacheData: Record<string, any>;
    constructor(cloner: ICloner);
    /**
     * Store data into an in-memory object
     * @param key key to store data against
     * @param dataToCache - Data to store in cache
     */
    storeByKey(key: string, dataToCache: any): void;
    /**
     * Retrieve data stored by a key
     * @param key key
     * @returns Stored data
     */
    getDataByKey<T>(key: string): any | undefined;
    /**
     * Does data exist against the provided key
     * @param key Key to check for data against
     * @returns true if exists
     */
    hasStoredDataByKey(key: string): boolean;
    /**
     * Remove data stored against key
     * @param key Key to remove data against
     */
    clearDataStoredByKey(key: string): void;
}
