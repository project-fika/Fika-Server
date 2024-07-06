import { BuildsCallbacks } from "@spt/callbacks/BuildsCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class BuildsStaticRouter extends StaticRouter {
    protected buildsCallbacks: BuildsCallbacks;
    constructor(buildsCallbacks: BuildsCallbacks);
}
