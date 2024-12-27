import type { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import type { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
export interface ISptCommand {
    getCommand(): string;
    getCommandHelp(): string;
    performAction(commandHandler: IUserDialogInfo, sessionId: string, request: ISendMessageRequest): string;
}
