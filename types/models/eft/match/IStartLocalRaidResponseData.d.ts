import type { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import type { IInsuredItem } from "@spt/models/eft/common/tables/IBotBase";
import type { ILocationServices } from "@spt/models/eft/common/tables/ILocationServices";
import type { TransitionType } from "@spt/models/enums/TransitionType";
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
