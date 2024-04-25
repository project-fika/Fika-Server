import { DataCallbacks } from "@spt-aki/callbacks/DataCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class DataStaticRouter extends StaticRouter {
    protected dataCallbacks: DataCallbacks;
    constructor(dataCallbacks: DataCallbacks);
}
