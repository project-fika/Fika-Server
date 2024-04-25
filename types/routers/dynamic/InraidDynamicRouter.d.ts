import { InraidCallbacks } from "@spt-aki/callbacks/InraidCallbacks";
import { DynamicRouter } from "@spt-aki/di/Router";
export declare class InraidDynamicRouter extends DynamicRouter {
    protected inraidCallbacks: InraidCallbacks;
    constructor(inraidCallbacks: InraidCallbacks);
    getTopLevelRoute(): string;
}
