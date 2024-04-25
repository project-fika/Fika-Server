import { LocationController } from "@spt-aki/controllers/LocationController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { ILocationBase } from "@spt-aki/models/eft/common/ILocationBase";
import { ILocationsGenerateAllResponse } from "@spt-aki/models/eft/common/ILocationsSourceDestinationBase";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IGetLocationRequestData } from "@spt-aki/models/eft/location/IGetLocationRequestData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
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
