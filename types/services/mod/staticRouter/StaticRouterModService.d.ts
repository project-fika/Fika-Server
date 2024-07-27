import { RouteAction } from "@spt/di/Router";
import { DependencyContainer } from "tsyringe";
export declare class StaticRouterModService {
    protected container: DependencyContainer;
    constructor(container: DependencyContainer);
    registerStaticRouter(name: string, routes: RouteAction[], topLevelRoute: string): void;
}
