import { IBaseInteractionRequestData } from "@spt-aki/models/eft/common/request/IBaseInteractionRequestData";
export interface IOffraidEatRequestData extends IBaseInteractionRequestData {
    Action: "Eat";
    item: string;
    count: number;
    time: number;
}
