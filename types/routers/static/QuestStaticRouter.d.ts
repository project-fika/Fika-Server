import { QuestCallbacks } from "@spt-aki/callbacks/QuestCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class QuestStaticRouter extends StaticRouter {
    protected questCallbacks: QuestCallbacks;
    constructor(questCallbacks: QuestCallbacks);
}
