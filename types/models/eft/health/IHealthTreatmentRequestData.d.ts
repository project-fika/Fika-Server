export interface IHealthTreatmentRequestData {
    Action: "RestoreHealth";
    trader: string;
    items: IItemCost[];
    difference: IDifference;
    timestamp: number;
}
export interface IItemCost {
    /** Id of stack to take money from */
    id: string;
    /** Amount of money to take off player for treatment */
    count: number;
}
export interface IDifference {
    BodyParts: IBodyParts;
    Energy: number;
    Hydration: number;
}
export interface IBodyParts {
    Head: IBodyPart;
    Chest: IBodyPart;
    Stomach: IBodyPart;
    LeftArm: IBodyPart;
    RightArm: IBodyPart;
    LeftLeg: IBodyPart;
    RightLeg: IBodyPart;
}
export interface IBodyPart {
    Health: number;
    /** Effects in array are to be removed */
    Effects: string[];
}
