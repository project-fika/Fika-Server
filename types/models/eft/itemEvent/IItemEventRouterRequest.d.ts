export interface IItemEventRouterRequest {
    data: Daum[];
    tm: number;
    reload: number;
}
export interface Daum {
    Action: string;
    item: string;
    to: To;
}
export interface To {
    id: string;
    container: string;
    location?: Location;
}
export interface Location {
    x: number;
    y: number;
    r: string;
    isSearched: boolean;
}
