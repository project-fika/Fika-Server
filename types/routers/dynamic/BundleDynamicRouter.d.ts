import { BundleCallbacks } from "@spt-aki/callbacks/BundleCallbacks";
import { DynamicRouter } from "@spt-aki/di/Router";
export declare class BundleDynamicRouter extends DynamicRouter {
    protected bundleCallbacks: BundleCallbacks;
    constructor(bundleCallbacks: BundleCallbacks);
}
