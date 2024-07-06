import { NotifierCallbacks } from "@spt/callbacks/NotifierCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class NotifierStaticRouter extends StaticRouter {
    protected notifierCallbacks: NotifierCallbacks;
    constructor(notifierCallbacks: NotifierCallbacks);
}
