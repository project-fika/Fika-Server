import { MinMax } from "@spt/models/common/MinMax";
export interface IHideoutScavCase {
    _id: string;
    ProductionTime: number;
    Requirements: Requirement[];
    EndProducts: EndProducts;
}
export interface Requirement {
    templateId: string;
    count: number;
    isFunctional: boolean;
    type: string;
}
export interface EndProducts {
    Common: MinMax;
    Rare: MinMax;
    Superrare: MinMax;
}
