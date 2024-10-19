export interface IItemEventRouterRequest {
    data: IDaum[];
    tm: number;
    reload: number;
}
export interface IDaum {
    Action: string;
    item: string;
    to: ITo;
}
export interface ITo {
    id: string;
    container: string;
    location?: ILocation;
}
export interface ILocation {
    x: number;
    y: number;
    r: string;
    isSearched: boolean;
}
