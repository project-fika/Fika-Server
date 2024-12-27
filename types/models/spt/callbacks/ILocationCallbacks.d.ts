import type { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import type { ILocationsGenerateAllResponse } from "@spt/models/eft/common/ILocationsSourceDestinationBase";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IGetLocationRequestData } from "@spt/models/eft/location/IGetLocationRequestData";
export interface ILocationCallbacks {
    getLocationData(url: string, info: any, sessionID: string): IGetBodyResponseData<ILocationsGenerateAllResponse>;
    getLocation(url: string, info: IGetLocationRequestData, sessionID: string): IGetBodyResponseData<ILocationBase>;
}
