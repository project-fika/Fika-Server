export interface ISyncHealthRequestData {
    Health: Health;
    IsAlive: boolean;
    Hydration?: number;
    Energy?: number;
    Temperature?: number;
}
export interface Health {
    Head?: BodyPartHealth;
    Chest?: BodyPartHealth;
    Stomach?: BodyPartHealth;
    LeftArm?: BodyPartHealth;
    RightArm?: BodyPartHealth;
    LeftLeg?: BodyPartHealth;
    RightLeg?: BodyPartHealth;
}
export interface BodyPartHealth {
    Maximum: number;
    Current: number;
    Effects: Record<string, number>;
}
