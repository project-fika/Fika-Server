import { InraidController } from "@spt-aki/controllers/InraidController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { IItemDeliveryRequestData } from "@spt-aki/models/eft/inRaid/IItemDeliveryRequestData";
import { IRegisterPlayerRequestData } from "@spt-aki/models/eft/inRaid/IRegisterPlayerRequestData";
import { ISaveProgressRequestData } from "@spt-aki/models/eft/inRaid/ISaveProgressRequestData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
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
     * Handle raid/profile/save
     * @param url
     * @param info Save progress request
     * @param sessionID Session id
     * @returns Null http response
     */
    saveProgress(url: string, info: ISaveProgressRequestData, sessionID: string): INullResponseData;
    /**
     * Handle singleplayer/settings/raid/endstate
     * @returns
     */
    getRaidEndState(): string;
    /**
     * Handle singleplayer/settings/raid/menu
     * @returns JSON as string
     */
    getRaidMenuSettings(): string;
    /**
     * Handle singleplayer/airdrop/config
     * @returns JSON as string
     */
    getAirdropConfig(): string;
    /**
     * Handle singleplayer/btr/config
     * @returns JSON as string
     */
    getBTRConfig(): string;
    /**
     * Handle singleplayer/traderServices/getTraderServices
     */
    getTraderServices(url: string, info: IEmptyRequestData, sessionId: string): string;
    /**
     * Handle singleplayer/traderServices/itemDelivery
     */
    itemDelivery(url: string, request: IItemDeliveryRequestData, sessionId: string): INullResponseData;
    getTraitorScavHostileChance(url: string, info: IEmptyRequestData, sessionId: string): string;
    getSandboxMaxPatrolValue(url: string, info: IEmptyRequestData, sessionId: string): string;
}
