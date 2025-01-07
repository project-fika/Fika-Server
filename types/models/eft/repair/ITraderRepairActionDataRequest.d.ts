import { IBaseRepairActionDataRequest } from "@spt/models/eft/repair/IBaseRepairActionDataRequest";
export interface ITraderRepairActionDataRequest extends IBaseRepairActionDataRequest {
    Action: "TraderRepair";
    tid: string;
    repairItems: IRepairItem[];
}
export interface IRepairItem {
    _id: string;
    count: number;
}
