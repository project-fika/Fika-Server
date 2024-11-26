import { ILocations } from "@spt/models/spt/server/ILocations";
export interface ILocationsGenerateAllResponse {
    locations: ILocations;
    paths: IPath[];
}
export interface IPath {
    Source: string;
    Destination: string;
}
