export interface IWorkoutData extends Record<string, any> {
    skills: IWorkoutSkills;
    effects: IWorkoutEffects;
}
export interface IWorkoutSkills {
    Common: IWorkoutSkillCommon[];
    Mastering: any[];
    Bonuses: any;
    Points: number;
}
export interface IWorkoutSkillCommon {
    Id: string;
    Progress: number;
    PointsEarnedDuringSession: number;
    LastAccess: number;
}
export interface IWorkoutEffects {
    Effects: IWorkoutEffectsParts;
    Hydration: number;
    Energy: number;
}
export interface IWorkoutEffectsParts {
    Head: IWorkoutBodyPart;
    Chest: IWorkoutBodyPart;
    Stomach: IWorkoutBodyPart;
    LeftArm: IWorkoutBodyPart;
    RightArm: IWorkoutBodyPart;
    LeftLeg: IWorkoutBodyPart;
    RightLeg: IWorkoutBodyPart;
    Common: IWorkoutBodyPart;
}
export interface IWorkoutBodyPart {
    Regeneration: number;
    Fracture: number;
    MildMusclePain: number;
}
