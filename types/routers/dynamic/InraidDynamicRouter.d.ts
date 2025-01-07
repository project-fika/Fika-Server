import { InraidCallbacks } from "@spt/callbacks/InraidCallbacks";
import { DynamicRouter } from "@spt/di/Router";
export declare class InraidDynamicRouter extends DynamicRouter {
    protected inraidCallbacks: InraidCallbacks;
    constructor(inraidCallbacks: InraidCallbacks);
    getTopLevelRoute(): string;
}
