export interface ILocationsBase {
    locations: any;
    paths: IPath[];
}
export interface IPath {
    Source: string;
    Event: boolean;
    Destination: string;
}
