import { HealthCallbacks } from "@spt/callbacks/HealthCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class HealthStaticRouter extends StaticRouter {
    protected healthCallbacks: HealthCallbacks;
    constructor(healthCallbacks: HealthCallbacks);
}
