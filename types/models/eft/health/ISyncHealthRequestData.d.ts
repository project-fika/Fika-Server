export interface ISyncHealthRequestData {
    Health: IBodyPartCollection;
    IsAlive: boolean;
    Hydration?: number;
    Energy?: number;
    Temperature?: number;
}
export interface IBodyPartCollection {
    Head?: IBodyPartHealth;
    Chest?: IBodyPartHealth;
    Stomach?: IBodyPartHealth;
    LeftArm?: IBodyPartHealth;
    RightArm?: IBodyPartHealth;
    LeftLeg?: IBodyPartHealth;
    RightLeg?: IBodyPartHealth;
}
export interface IBodyPartHealth {
    Maximum: number;
    Current: number;
    Effects: Record<string, number>;
}
