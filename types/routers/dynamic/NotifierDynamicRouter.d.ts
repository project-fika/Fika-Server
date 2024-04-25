import { NotifierCallbacks } from "@spt-aki/callbacks/NotifierCallbacks";
import { DynamicRouter } from "@spt-aki/di/Router";
export declare class NotifierDynamicRouter extends DynamicRouter {
    protected notifierCallbacks: NotifierCallbacks;
    constructor(notifierCallbacks: NotifierCallbacks);
}
