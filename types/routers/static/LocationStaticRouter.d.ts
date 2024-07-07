import { LocationCallbacks } from "@spt/callbacks/LocationCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class LocationStaticRouter extends StaticRouter {
    protected locationCallbacks: LocationCallbacks;
    constructor(locationCallbacks: LocationCallbacks);
}
