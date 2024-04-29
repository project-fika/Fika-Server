import { IChatCommand } from "@spt-aki/helpers/Dialogue/Commando/IChatCommand";
import { ISptCommand } from "@spt-aki/helpers/Dialogue/Commando/SptCommands/ISptCommand";
import { ISendMessageRequest } from "@spt-aki/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
export declare class SptCommandoCommands implements IChatCommand {
    protected configServer: ConfigServer;
    protected sptCommands: ISptCommand[];
    constructor(configServer: ConfigServer, sptCommands: ISptCommand[]);
    registerSptCommandoCommand(command: ISptCommand): void;
    getCommandHelp(command: string): string;
    getCommandPrefix(): string;
    getCommands(): Set<string>;
    handle(command: string, commandHandler: IUserDialogInfo, sessionId: string, request: ISendMessageRequest): string;
}
