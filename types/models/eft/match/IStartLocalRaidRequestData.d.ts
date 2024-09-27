export interface IStartLocalRaidRequestData {
    serverId: string;
    location: string;
    timeVariant: string;
    mode: string;
    playerSide: string;
    isLocationTransition: boolean;
    transition: IStartLocalRaidTransition;
}
export interface IStartLocalRaidTransition {
    isLocationTransition: boolean;
    transitionRaidId: string;
    transitionCount: number;
    visitedLocations: string[];
}
