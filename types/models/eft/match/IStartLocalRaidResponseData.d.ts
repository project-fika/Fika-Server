import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IInsuredItem } from "@spt/models/eft/common/tables/IBotBase";
import { ILocationServices } from "@spt/models/eft/common/tables/ILocationServices";
export interface IStartLocalRaidResponseData {
    serverId: string;
    serverSettings: ILocationServices;
    profile: IProfileInsuredItems;
    locationLoot: ILocationBase;
}
export interface IProfileInsuredItems {
    insuredItems: IInsuredItem[];
}
