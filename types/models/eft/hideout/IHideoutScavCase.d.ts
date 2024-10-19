import { MinMax } from "@spt/models/common/MinMax";
export interface IHideoutScavCase {
    _id: string;
    ProductionTime: number;
    Requirements: IRequirement[];
    EndProducts: IEndProducts;
}
export interface IRequirement {
    templateId: string;
    count: number;
    isFunctional: boolean;
    type: string;
}
export interface IEndProducts {
    Common: MinMax;
    Rare: MinMax;
    Superrare: MinMax;
}
