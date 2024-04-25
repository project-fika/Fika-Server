import { ILocations } from "@spt-aki/models/spt/server/ILocations";
export interface ILocationsGenerateAllResponse {
    locations: ILocations;
    paths: Path[];
}
export interface Path {
    Source: string;
    Destination: string;
}
