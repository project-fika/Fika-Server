import { IChangeRequestData } from "@spt-aki/models/eft/launcher/IChangeRequestData";
import { IGetMiniProfileRequestData } from "@spt-aki/models/eft/launcher/IGetMiniProfileRequestData";
import { ILoginRequestData } from "@spt-aki/models/eft/launcher/ILoginRequestData";
import { IRegisterData } from "@spt-aki/models/eft/launcher/IRegisterData";
import { IRemoveProfileData } from "@spt-aki/models/eft/launcher/IRemoveProfileData";
export interface ILauncherCallbacks {
    connect(): string;
    login(url: string, info: ILoginRequestData, sessionID: string): string;
    register(url: string, info: IRegisterData, sessionID: string): "FAILED" | "OK";
    get(url: string, info: ILoginRequestData, sessionID: string): string;
    changeUsername(url: string, info: IChangeRequestData, sessionID: string): "FAILED" | "OK";
    changePassword(url: string, info: IChangeRequestData, sessionID: string): "FAILED" | "OK";
    wipe(url: string, info: IRegisterData, sessionID: string): "FAILED" | "OK";
    getMiniProfile(url: string, info: IGetMiniProfileRequestData, sessionID: string): string;
    getAllMiniProfiles(url: string, info: any, sessionID: string): string;
    getServerVersion(): string;
    ping(url: string, info: any, sessionID: string): string;
    removeProfile(url: string, info: IRemoveProfileData, sessionID: string): string;
    getCompatibleTarkovVersion(): string;
}
