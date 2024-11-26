import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { BundleHashCacheService } from "@spt/services/cache/BundleHashCacheService";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { VFS } from "@spt/utils/VFS";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class BundleInfo {
    modpath: string;
    filename: string;
    crc: number;
    dependencies: string[];
    constructor(modpath: string, bundle: IBundleManifestEntry, bundleHash: number);
}
export declare class BundleLoader {
    protected httpServerHelper: HttpServerHelper;
    protected vfs: VFS;
    protected jsonUtil: JsonUtil;
    protected bundleHashCacheService: BundleHashCacheService;
    protected cloner: ICloner;
    protected bundles: Record<string, BundleInfo>;
    constructor(httpServerHelper: HttpServerHelper, vfs: VFS, jsonUtil: JsonUtil, bundleHashCacheService: BundleHashCacheService, cloner: ICloner);
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
