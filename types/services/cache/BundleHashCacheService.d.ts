import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
import { HashUtil } from "@spt/utils/HashUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class BundleHashCacheService {
    protected fileSystemSync: FileSystemSync;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected logger: ILogger;
    protected bundleHashes: Record<string, number>;
    protected readonly bundleHashCachePath = "./user/cache/bundleHashCache.json";
    constructor(fileSystemSync: FileSystemSync, hashUtil: HashUtil, jsonUtil: JsonUtil, logger: ILogger);
    getStoredValue(key: string): number;
    storeValue(key: string, value: number): void;
    matchWithStoredHash(bundlePath: string, hash: number): boolean;
    calculateAndMatchHash(bundlePath: string): boolean;
    calculateAndStoreHash(bundlePath: string): void;
}
