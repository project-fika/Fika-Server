import { HealthCallbacks } from "@spt-aki/callbacks/HealthCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class HealthStaticRouter extends StaticRouter {
    protected healthCallbacks: HealthCallbacks;
    constructor(healthCallbacks: HealthCallbacks);
}
