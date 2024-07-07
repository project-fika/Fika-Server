import { BundleCallbacks } from "@spt/callbacks/BundleCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class BundleStaticRouter extends StaticRouter {
    protected bundleCallbacks: BundleCallbacks;
    constructor(bundleCallbacks: BundleCallbacks);
}
