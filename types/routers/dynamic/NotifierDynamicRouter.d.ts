import { NotifierCallbacks } from "@spt/callbacks/NotifierCallbacks";
import { DynamicRouter } from "@spt/di/Router";
export declare class NotifierDynamicRouter extends DynamicRouter {
    protected notifierCallbacks: NotifierCallbacks;
    constructor(notifierCallbacks: NotifierCallbacks);
}
