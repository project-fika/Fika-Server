import { LocationCallbacks } from "@spt-aki/callbacks/LocationCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class LocationStaticRouter extends StaticRouter {
    protected locationCallbacks: LocationCallbacks;
    constructor(locationCallbacks: LocationCallbacks);
}
