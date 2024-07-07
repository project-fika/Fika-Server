import { QuestCallbacks } from "@spt/callbacks/QuestCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class QuestStaticRouter extends StaticRouter {
    protected questCallbacks: QuestCallbacks;
    constructor(questCallbacks: QuestCallbacks);
}
