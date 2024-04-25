import { LauncherController } from "@spt-aki/controllers/LauncherController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IChangeRequestData } from "@spt-aki/models/eft/launcher/IChangeRequestData";
import { ILoginRequestData } from "@spt-aki/models/eft/launcher/ILoginRequestData";
import { IRegisterData } from "@spt-aki/models/eft/launcher/IRegisterData";
import { IRemoveProfileData } from "@spt-aki/models/eft/launcher/IRemoveProfileData";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { Watermark } from "@spt-aki/utils/Watermark";
export declare class LauncherCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected launcherController: LauncherController;
    protected saveServer: SaveServer;
    protected watermark: Watermark;
    constructor(httpResponse: HttpResponseUtil, launcherController: LauncherController, saveServer: SaveServer, watermark: Watermark);
    connect(): string;
    login(url: string, info: ILoginRequestData, sessionID: string): string;
    register(url: string, info: IRegisterData, sessionID: string): "FAILED" | "OK";
    get(url: string, info: ILoginRequestData, sessionID: string): string;
    changeUsername(url: string, info: IChangeRequestData, sessionID: string): "FAILED" | "OK";
    changePassword(url: string, info: IChangeRequestData, sessionID: string): "FAILED" | "OK";
    wipe(url: string, info: IRegisterData, sessionID: string): "FAILED" | "OK";
    getServerVersion(): string;
    ping(url: string, info: IEmptyRequestData, sessionID: string): string;
    removeProfile(url: string, info: IRemoveProfileData, sessionID: string): string;
    getCompatibleTarkovVersion(): string;
    getLoadedServerMods(): string;
    getServerModsProfileUsed(url: string, info: IEmptyRequestData, sessionId: string): string;
}
