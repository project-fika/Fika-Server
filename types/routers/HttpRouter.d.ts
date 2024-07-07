/// <reference types="node" />
import { IncomingMessage } from "node:http";
import { DynamicRouter, Router, StaticRouter } from "@spt/di/Router";
export declare class HttpRouter {
    protected staticRouters: StaticRouter[];
    protected dynamicRoutes: DynamicRouter[];
    constructor(staticRouters: StaticRouter[], dynamicRoutes: DynamicRouter[]);
    protected groupBy<T>(list: T[], keyGetter: (t: T) => string): Map<string, T[]>;
    getResponse(req: IncomingMessage, info: any, sessionID: string): Promise<string>;
    protected handleRoute(url: string, info: any, sessionID: string, wrapper: ResponseWrapper, routers: Router[], dynamic: boolean): Promise<boolean>;
}
declare class ResponseWrapper {
    output: string;
    constructor(output: string);
}
export {};
