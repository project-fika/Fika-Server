export interface ILocationsBase {
    locations: Locations;
    paths: Path[];
}
export type Locations = {};
export interface Path {
    Source: string;
    Destination: string;
}
