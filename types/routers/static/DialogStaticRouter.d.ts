import { DialogueCallbacks } from "@spt/callbacks/DialogueCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class DialogStaticRouter extends StaticRouter {
    protected dialogueCallbacks: DialogueCallbacks;
    constructor(dialogueCallbacks: DialogueCallbacks);
}
