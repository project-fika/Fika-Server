import { LauncherCallbacks } from "@spt-aki/callbacks/LauncherCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class LauncherStaticRouter extends StaticRouter {
    protected launcherCallbacks: LauncherCallbacks;
    constructor(launcherCallbacks: LauncherCallbacks);
}
