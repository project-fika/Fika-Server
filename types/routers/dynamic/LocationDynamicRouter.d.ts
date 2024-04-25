import { LocationCallbacks } from "@spt-aki/callbacks/LocationCallbacks";
import { DynamicRouter } from "@spt-aki/di/Router";
export declare class LocationDynamicRouter extends DynamicRouter {
    protected locationCallbacks: LocationCallbacks;
    constructor(locationCallbacks: LocationCallbacks);
    getTopLevelRoute(): string;
}
