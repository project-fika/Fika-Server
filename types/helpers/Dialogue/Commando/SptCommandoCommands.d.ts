import { IChatCommand } from "@spt/helpers/Dialogue/Commando/IChatCommand";
import { ISptCommand } from "@spt/helpers/Dialogue/Commando/SptCommands/ISptCommand";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { IUserDialogInfo } from "@spt/models/eft/profile/ISptProfile";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
export declare class SptCommandoCommands implements IChatCommand {
    protected configServer: ConfigServer;
    protected localisationService: LocalisationService;
    protected sptCommands: ISptCommand[];
    constructor(configServer: ConfigServer, localisationService: LocalisationService, sptCommands: ISptCommand[]);
    registerSptCommandoCommand(command: ISptCommand): void;
    getCommandHelp(command: string): string;
    getCommandPrefix(): string;
    getCommands(): Set<string>;
    handle(command: string, commandHandler: IUserDialogInfo, sessionId: string, request: ISendMessageRequest): string;
}
