import { DataCallbacks } from "@spt-aki/callbacks/DataCallbacks";
import { DynamicRouter } from "@spt-aki/di/Router";
export declare class DataDynamicRouter extends DynamicRouter {
    protected dataCallbacks: DataCallbacks;
    constructor(dataCallbacks: DataCallbacks);
}
