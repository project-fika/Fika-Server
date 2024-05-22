import { LocationController } from "@spt/controllers/LocationController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { ILocationsGenerateAllResponse } from "@spt/models/eft/common/ILocationsSourceDestinationBase";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { IGetLocationRequestData } from "@spt/models/eft/location/IGetLocationRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class LocationCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected locationController: LocationController;
    constructor(httpResponse: HttpResponseUtil, locationController: LocationController);
    /** Handle client/locations */
    getLocationData(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ILocationsGenerateAllResponse>;
    /** Handle client/location/getLocalloot */
    getLocation(url: string, info: IGetLocationRequestData, sessionID: string): IGetBodyResponseData<ILocationBase>;
    /** Handle client/location/getAirdropLoot */
    getAirdropLoot(url: string, info: IEmptyRequestData, sessionID: string): string;
}
