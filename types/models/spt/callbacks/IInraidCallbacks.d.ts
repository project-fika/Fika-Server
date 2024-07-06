import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IRegisterPlayerRequestData } from "@spt/models/eft/inRaid/IRegisterPlayerRequestData";
import { ISaveProgressRequestData } from "@spt/models/eft/inRaid/ISaveProgressRequestData";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
export interface IInraidCallbacks {
    onLoad(sessionID: string): ISptProfile;
    registerPlayer(url: string, info: IRegisterPlayerRequestData, sessionID: string): INullResponseData;
    saveProgress(url: string, info: ISaveProgressRequestData, sessionID: string): INullResponseData;
    getRaidEndState(): string;
    getRaidMenuSettings(url: string, info: IEmptyRequestData, sessionID: string): string;
    getWeaponDurability(url: string, info: any, sessionID: string): string;
    getAirdropConfig(url: string, info: any, sessionID: string): string;
}
