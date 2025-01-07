import { BundleLoader } from "@spt/loaders/BundleLoader";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class BundleCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected bundleLoader: BundleLoader;
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    constructor(httpResponse: HttpResponseUtil, bundleLoader: BundleLoader, configServer: ConfigServer);
    /**
     * Handle singleplayer/bundles
     */
    getBundles(url: string, info: any, sessionID: string): string;
    getBundle(url: string, info: any, sessionID: string): string;
}
