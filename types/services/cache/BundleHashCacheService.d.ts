import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";
export declare class BundleHashCacheService {
    protected vfs: VFS;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected logger: ILogger;
    protected bundleHashes: Record<string, number>;
    protected readonly bundleHashCachePath = "./user/cache/bundleHashCache.json";
    constructor(vfs: VFS, hashUtil: HashUtil, jsonUtil: JsonUtil, logger: ILogger);
    getStoredValue(key: string): number;
    storeValue(key: string, value: number): void;
    matchWithStoredHash(bundlePath: string, hash: number): boolean;
    calculateAndMatchHash(bundlePath: string): boolean;
    calculateAndStoreHash(bundlePath: string): void;
}
