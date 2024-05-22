import { LauncherCallbacks } from "@spt/callbacks/LauncherCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class LauncherStaticRouter extends StaticRouter {
    protected launcherCallbacks: LauncherCallbacks;
    constructor(launcherCallbacks: LauncherCallbacks);
}
