import { InraidCallbacks } from "@spt/callbacks/InraidCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class InraidStaticRouter extends StaticRouter {
    protected inraidCallbacks: InraidCallbacks;
    constructor(inraidCallbacks: InraidCallbacks);
}
