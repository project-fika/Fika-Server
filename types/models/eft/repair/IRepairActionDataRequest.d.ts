import { IBaseRepairActionDataRequest } from "@spt/models/eft/repair/IBaseRepairActionDataRequest";
export interface IRepairActionDataRequest extends IBaseRepairActionDataRequest {
    Action: "Repair";
    repairKitsInfo: IRepairKitsInfo[];
    target: string;
}
export interface IRepairKitsInfo {
    _id: string;
    count: number;
}
