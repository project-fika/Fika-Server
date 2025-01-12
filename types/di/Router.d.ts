import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
export declare class Router {
    protected handledRoutes: HandledRoute[];
    getTopLevelRoute(): string;
    protected getHandledRoutes(): HandledRoute[];
    protected getInternalHandledRoutes(): HandledRoute[];
    canHandle(url: string, partialMatch?: boolean): boolean;
}
export declare class StaticRouter extends Router {
    private routes;
    constructor(routes: RouteAction[]);
    handleStatic(url: string, info: any, sessionID: string, output: string): Promise<any>;
    getHandledRoutes(): HandledRoute[];
}
export declare class DynamicRouter extends Router {
    private routes;
    constructor(routes: RouteAction[]);
    handleDynamic(url: string, info: any, sessionID: string, output: string): Promise<any>;
    getHandledRoutes(): HandledRoute[];
}
export declare class ItemEventRouterDefinition extends Router {
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string, output: IItemEventRouterResponse): Promise<any>;
}
export declare class SaveLoadRouter extends Router {
    handleLoad(profile: ISptProfile): Promise<ISptProfile>;
}
export declare class HandledRoute {
    route: string;
    dynamic: boolean;
    constructor(route: string, dynamic: boolean);
}
export declare class RouteAction {
    url: string;
    action: (url: string, info: any, sessionID: string, output: string) => Promise<any>;
    constructor(url: string, action: (url: string, info: any, sessionID: string, output: string) => Promise<any>);
}
