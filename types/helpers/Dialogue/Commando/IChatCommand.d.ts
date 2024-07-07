import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
/**
 * @deprecated As of v3.7.6. Use IChatCommand. Will be removed in v3.9.0.
 */
export type ICommandoCommand = IChatCommand;
export interface IChatCommand {
    getCommandPrefix(): string;
    getCommandHelp(command: string): string;
    getCommands(): Set<string>;
    handle(command: string, commandHandler: IUserDialogInfo, sessionId: string, request: ISendMessageRequest): string;
}
