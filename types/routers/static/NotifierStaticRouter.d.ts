import { NotifierCallbacks } from "@spt-aki/callbacks/NotifierCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class NotifierStaticRouter extends StaticRouter {
    protected notifierCallbacks: NotifierCallbacks;
    constructor(notifierCallbacks: NotifierCallbacks);
}
