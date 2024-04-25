export interface IHealthTreatmentRequestData {
    Action: "RestoreHealth";
    trader: string;
    items: Cost[];
    difference: Difference;
    timestamp: number;
}
export interface Cost {
    /** Id of stack to take money from */
    id: string;
    /** Amount of money to take off player for treatment */
    count: number;
}
export interface Difference {
    BodyParts: BodyParts;
    Energy: number;
    Hydration: number;
}
export interface BodyParts {
    Head: BodyPart;
    Chest: BodyPart;
    Stomach: BodyPart;
    LeftArm: BodyPart;
    RightArm: BodyPart;
    LeftLeg: BodyPart;
    RightLeg: BodyPart;
}
export interface BodyPart {
    Health: number;
    /** Effects in array are to be removed */
    Effects: string[];
}
