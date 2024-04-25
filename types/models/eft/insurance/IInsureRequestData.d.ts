import { IBaseInteractionRequestData } from "@spt-aki/models/eft/common/request/IBaseInteractionRequestData";
export interface IInsureRequestData extends IBaseInteractionRequestData {
    Action: "Insure";
    tid: string;
    items: string[];
}
