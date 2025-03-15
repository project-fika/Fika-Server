import { IPath } from "@spt/models/eft/common/tables/ILocationsBase";
import { ILocations } from "@spt/models/spt/server/ILocations";
export interface ILocationsGenerateAllResponse {
    locations: ILocations;
    paths: IPath[];
}
