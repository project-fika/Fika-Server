import { BundleCallbacks } from "@spt-aki/callbacks/BundleCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class BundleStaticRouter extends StaticRouter {
    protected bundleCallbacks: BundleCallbacks;
    constructor(bundleCallbacks: BundleCallbacks);
}
