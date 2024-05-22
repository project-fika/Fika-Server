import { BundleCallbacks } from "@spt/callbacks/BundleCallbacks";
import { DynamicRouter } from "@spt/di/Router";
export declare class BundleDynamicRouter extends DynamicRouter {
    protected bundleCallbacks: BundleCallbacks;
    constructor(bundleCallbacks: BundleCallbacks);
}
