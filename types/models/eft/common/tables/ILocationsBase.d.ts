export interface ILocationsBase {
    locations: ILocations;
    paths: IPath[];
}
export type ILocations = {};
export interface IPath {
    Source: string;
    Destination: string;
}
