import { DependencyContainer } from "tsyringe";
import { RouteAction } from "@spt-aki/di/Router";
export declare class StaticRouterModService {
    protected container: DependencyContainer;
    constructor(container: DependencyContainer);
    registerStaticRouter(name: string, routes: RouteAction[], topLevelRoute: string): void;
}
