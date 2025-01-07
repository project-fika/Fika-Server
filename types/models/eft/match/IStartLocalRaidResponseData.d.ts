import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IInsuredItem } from "@spt/models/eft/common/tables/IBotBase";
import { ILocationServices } from "@spt/models/eft/common/tables/ILocationServices";
import { TransitionType } from "@spt/models/enums/TransitionType";
export interface IStartLocalRaidResponseData {
    serverId: string;
    serverSettings: ILocationServices;
    profile: IProfileInsuredItems;
    locationLoot: ILocationBase;
    transitionType: TransitionType;
    transition: ITransition;
}
export interface IProfileInsuredItems {
    insuredItems: IInsuredItem[];
}
export interface ITransition {
    transitionType: TransitionType;
    transitionRaidId: string;
    transitionCount: number;
    visitedLocations: string[];
}
