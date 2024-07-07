import { DataCallbacks } from "@spt/callbacks/DataCallbacks";
import { DynamicRouter } from "@spt/di/Router";
export declare class DataDynamicRouter extends DynamicRouter {
    protected dataCallbacks: DataCallbacks;
    constructor(dataCallbacks: DataCallbacks);
}
