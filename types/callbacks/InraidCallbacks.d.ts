import { InraidController } from "@spt/controllers/InraidController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IRegisterPlayerRequestData } from "@spt/models/eft/inRaid/IRegisterPlayerRequestData";
import { IScavSaveRequestData } from "@spt/models/eft/inRaid/IScavSaveRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
/**
 * Handle client requests
 */
export declare class InraidCallbacks {
    protected inraidController: InraidController;
    protected httpResponse: HttpResponseUtil;
    constructor(inraidController: InraidController, httpResponse: HttpResponseUtil);
    /**
     * Handle client/location/getLocalloot
     * Store active map in profile + applicationContext
     * @param url
     * @param info register player request
     * @param sessionID Session id
     * @returns Null http response
     */
    registerPlayer(url: string, info: IRegisterPlayerRequestData, sessionID: string): INullResponseData;
    /**
     * Handle raid/profile/scavsave
     * @param url
     * @param info Save progress request
     * @param sessionID Session id
     * @returns Null http response
     */
    saveProgress(url: string, info: IScavSaveRequestData, sessionID: string): INullResponseData;
    /**
     * Handle singleplayer/settings/raid/menu
     * @returns JSON as string
     */
    getRaidMenuSettings(): string;
    getTraitorScavHostileChance(url: string, info: IEmptyRequestData, sessionId: string): string;
    getBossConvertSettings(url: string, info: IEmptyRequestData, sessionId: string): string;
}
