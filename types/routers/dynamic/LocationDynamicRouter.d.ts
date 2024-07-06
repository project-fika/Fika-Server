import { LocationCallbacks } from "@spt/callbacks/LocationCallbacks";
import { DynamicRouter } from "@spt/di/Router";
export declare class LocationDynamicRouter extends DynamicRouter {
    protected locationCallbacks: LocationCallbacks;
    constructor(locationCallbacks: LocationCallbacks);
    getTopLevelRoute(): string;
}
