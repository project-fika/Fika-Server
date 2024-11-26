import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IInsuredItem } from "@spt/models/eft/common/tables/IBotBase";
import { ILocationServices } from "@spt/models/eft/common/tables/ILocationServices";
export interface IStartLocalRaidResponseData {
    serverId: string;
    serverSettings: ILocationServices;
    profile: IProfileInsuredItems;
    locationLoot: ILocationBase;
    transition: ITransition;
}
export interface IProfileInsuredItems {
    insuredItems: IInsuredItem[];
}
export interface ITransition {
    isLocationTransition: boolean;
    transitionRaidId: string;
    transitionCount: number;
    visitedLocations: string[];
}
