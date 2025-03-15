import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
import { HashUtil } from "@spt/utils/HashUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class ModHashCacheService {
    protected fileSystemSync: FileSystemSync;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected logger: ILogger;
    protected modHashes: Record<string, string>;
    protected readonly modCachePath = "./user/cache/modCache.json";
    constructor(fileSystemSync: FileSystemSync, hashUtil: HashUtil, jsonUtil: JsonUtil, logger: ILogger);
    getStoredValue(key: string): string;
    storeValue(key: string, value: string): void;
    matchWithStoredHash(modName: string, hash: string): boolean;
    calculateAndCompareHash(modName: string, modContent: string): Promise<boolean>;
    calculateAndStoreHash(modName: string, modContent: string): Promise<void>;
}
