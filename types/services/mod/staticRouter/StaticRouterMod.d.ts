import { RouteAction, StaticRouter } from "@spt-aki/di/Router";
export declare class StaticRouterMod extends StaticRouter {
    private topLevelRoute;
    constructor(routes: RouteAction[], topLevelRoute: string);
    getTopLevelRoute(): string;
}
