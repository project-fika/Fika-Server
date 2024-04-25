import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { IRegisterPlayerRequestData } from "@spt-aki/models/eft/inRaid/IRegisterPlayerRequestData";
import { ISaveProgressRequestData } from "@spt-aki/models/eft/inRaid/ISaveProgressRequestData";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface IInraidCallbacks {
    onLoad(sessionID: string): IAkiProfile;
    registerPlayer(url: string, info: IRegisterPlayerRequestData, sessionID: string): INullResponseData;
    saveProgress(url: string, info: ISaveProgressRequestData, sessionID: string): INullResponseData;
    getRaidEndState(): string;
    getRaidMenuSettings(url: string, info: IEmptyRequestData, sessionID: string): string;
    getWeaponDurability(url: string, info: any, sessionID: string): string;
    getAirdropConfig(url: string, info: any, sessionID: string): string;
}
