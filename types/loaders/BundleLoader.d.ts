import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { BundleHashCacheService } from "@spt-aki/services/cache/BundleHashCacheService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";
export declare class BundleInfo {
    modpath: string;
    filename: string;
    crc: number;
    dependencies: string[];
    constructor(modpath: string, bundle: BundleManifestEntry, bundleHash: number);
}
export declare class BundleLoader {
    protected httpServerHelper: HttpServerHelper;
    protected vfs: VFS;
    protected jsonUtil: JsonUtil;
    protected bundleHashCacheService: BundleHashCacheService;
    protected bundles: Record<string, BundleInfo>;
    constructor(httpServerHelper: HttpServerHelper, vfs: VFS, jsonUtil: JsonUtil, bundleHashCacheService: BundleHashCacheService);
    /**
     * Handle singleplayer/bundles
     */
    getBundles(): BundleInfo[];
    getBundle(key: string): BundleInfo;
    addBundles(modpath: string): void;
    addBundle(key: string, b: BundleInfo): void;
}
export interface BundleManifest {
    manifest: BundleManifestEntry[];
}
export interface BundleManifestEntry {
    key: string;
    dependencyKeys: string[];
}
