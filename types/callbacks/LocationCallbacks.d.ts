import { LocationController } from "@spt/controllers/LocationController";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { ILocationsGenerateAllResponse } from "@spt/models/eft/common/ILocationsSourceDestinationBase";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IGetAirdropLootRequest } from "@spt/models/eft/location/IGetAirdropLootRequest";
import type { IGetAirdropLootResponse } from "@spt/models/eft/location/IGetAirdropLootResponse";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class LocationCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected locationController: LocationController;
    constructor(httpResponse: HttpResponseUtil, locationController: LocationController);
    /** Handle client/locations */
    getLocationData(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ILocationsGenerateAllResponse>;
    /** Handle client/airdrop/loot */
    getAirdropLoot(url: string, info: IGetAirdropLootRequest, sessionID: string): IGetBodyResponseData<IGetAirdropLootResponse>;
}
