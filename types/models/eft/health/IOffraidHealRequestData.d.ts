import { IBaseInteractionRequestData } from "@spt-aki/models/eft/common/request/IBaseInteractionRequestData";
export interface IOffraidHealRequestData extends IBaseInteractionRequestData {
    Action: "Heal";
    item: string;
    part: BodyPart;
    count: number;
    time: number;
}
export declare enum BodyPart {
    HEAD = "Head",
    CHEST = "Chest",
    STOMACH = "Stomach",
    LEFT_ARM = "LeftArm",
    RIGHT_ARM = "RightArm",
    LEFT_LEG = "LeftLeg",
    RIGHT_LEG = "RightLeg",
    COMMON = "Common"
}
