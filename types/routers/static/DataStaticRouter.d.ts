import { DataCallbacks } from "@spt/callbacks/DataCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class DataStaticRouter extends StaticRouter {
    protected dataCallbacks: DataCallbacks;
    constructor(dataCallbacks: DataCallbacks);
}
