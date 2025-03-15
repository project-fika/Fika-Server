import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { BundleHashCacheService } from "@spt/services/cache/BundleHashCacheService";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
import { JsonUtil } from "@spt/utils/JsonUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class BundleInfo {
    modpath: string;
    filename: string;
    crc: number;
    dependencies: string[];
    constructor(modpath: string, bundle: IBundleManifestEntry, bundleHash: number);
}
export declare class BundleLoader {
    protected httpServerHelper: HttpServerHelper;
    protected fileSystemSync: FileSystemSync;
    protected jsonUtil: JsonUtil;
    protected bundleHashCacheService: BundleHashCacheService;
    protected cloner: ICloner;
    protected bundles: Record<string, BundleInfo>;
    constructor(httpServerHelper: HttpServerHelper, fileSystemSync: FileSystemSync, jsonUtil: JsonUtil, bundleHashCacheService: BundleHashCacheService, cloner: ICloner);
    /**
     * Handle singleplayer/bundles
     */
    getBundles(): BundleInfo[];
    getBundle(key: string): BundleInfo;
    addBundles(modpath: string): void;
    addBundle(key: string, b: BundleInfo): void;
}
export interface IBundleManifest {
    manifest: IBundleManifestEntry[];
}
export interface IBundleManifestEntry {
    key: string;
    dependencyKeys: string[];
}
