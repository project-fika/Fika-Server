import { ILocationBase } from "@spt-aki/models/eft/common/ILocationBase";
import { ILocationsGenerateAllResponse } from "@spt-aki/models/eft/common/ILocationsSourceDestinationBase";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IGetLocationRequestData } from "@spt-aki/models/eft/location/IGetLocationRequestData";
export interface ILocationCallbacks {
    getLocationData(url: string, info: any, sessionID: string): IGetBodyResponseData<ILocationsGenerateAllResponse>;
    getLocation(url: string, info: IGetLocationRequestData, sessionID: string): IGetBodyResponseData<ILocationBase>;
}
