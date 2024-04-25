import { IBaseRepairActionDataRequest } from "@spt-aki/models/eft/repair/IBaseRepairActionDataRequest";
export interface ITraderRepairActionDataRequest extends IBaseRepairActionDataRequest {
    Action: "TraderRepair";
    tid: string;
    repairItems: RepairItem[];
}
export interface RepairItem {
    _id: string;
    count: number;
}
