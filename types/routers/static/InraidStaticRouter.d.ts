import { InraidCallbacks } from "@spt-aki/callbacks/InraidCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class InraidStaticRouter extends StaticRouter {
    protected inraidCallbacks: InraidCallbacks;
    constructor(inraidCallbacks: InraidCallbacks);
}
