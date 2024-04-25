import { BuildsCallbacks } from "@spt-aki/callbacks/BuildsCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class BuildsStaticRouter extends StaticRouter {
    protected buildsCallbacks: BuildsCallbacks;
    constructor(buildsCallbacks: BuildsCallbacks);
}
