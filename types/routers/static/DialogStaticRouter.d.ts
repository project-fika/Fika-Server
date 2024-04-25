import { DialogueCallbacks } from "@spt-aki/callbacks/DialogueCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class DialogStaticRouter extends StaticRouter {
    protected dialogueCallbacks: DialogueCallbacks;
    constructor(dialogueCallbacks: DialogueCallbacks);
}
