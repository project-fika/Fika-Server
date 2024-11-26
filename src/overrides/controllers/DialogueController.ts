import { DependencyContainer, inject, injectable } from "tsyringe";

import { DialogueController } from "@spt/controllers/DialogueController";
import { IGetFriendListDataResponse } from "@spt/models/eft/dialog/IGetFriendListDataResponse";

import { FikaDialogueController } from "../../controllers/FikaDialogueController";
import { Override } from "../../di/Override";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";

@injectable()
export class DialogueControllerOverride extends Override {
    constructor(@inject("FikaDialogueController") protected fikaDialogueController: FikaDialogueController) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "DialogueController",
            (_t, result: DialogueController) => {
                result.getFriendList = (sessionID: string): IGetFriendListDataResponse => {
                    return this.fikaDialogueController.getFriendList(sessionID);
                };

                result.sendMessage = (sessionId: string, request: ISendMessageRequest): string => {
                    return this.fikaDialogueController.sendMessage(sessionId, request);
                };
            },
            { frequency: "Always" },
        );
    }
}
