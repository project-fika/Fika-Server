import { TraderServiceType } from "@spt-aki/models/enums/TraderServiceType";
export interface ITraderServiceModel {
    serviceType: TraderServiceType;
    itemsToPay?: {
        [key: string]: number;
    };
    itemsToReceive?: string[];
    subServices?: {
        [key: string]: number;
    };
    requirements?: ITraderServiceRequirementsModel;
}
export interface ITraderServiceRequirementsModel {
    completedQuests?: string[];
    standings?: {
        [key: string]: number;
    };
}
