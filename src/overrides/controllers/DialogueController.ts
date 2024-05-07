import { DependencyContainer, inject, injectable } from "tsyringe";

import { DialogueController } from "@spt-aki/controllers/DialogueController";
import { IGetFriendListDataResponse } from "@spt-aki/models/eft/dialog/IGetFriendListDataResponse";

import { FikaDialogueController } from "../../controllers/FikaDialogueController";
import { Override } from "../../di/Override";

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
            },
            { frequency: "Always" },
        );
    }
}
