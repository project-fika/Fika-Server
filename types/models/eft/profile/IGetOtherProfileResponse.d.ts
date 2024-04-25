import { OverallCounters, Skills } from "@spt-aki/models/eft/common/tables/IBotBase";
import { Item } from "../common/tables/IItem";
export interface IGetOtherProfileResponse {
    id: string;
    aid: number;
    info: IOtherProfileInfo;
    customization: IOtherProfileCustomization;
    skills: Skills;
    equipment: IOtherProfileEquipment;
    achievements: Record<string, number>;
    favoriteItems: string[];
    pmcStats: IOtherProfileStats;
    scavStats: IOtherProfileStats;
}
export interface IOtherProfileInfo {
    nickname: string;
    side: string;
    experience: number;
    memberCategory: number;
    bannedState: boolean;
    bannedUntil: number;
    registrationDate: number;
}
export interface IOtherProfileCustomization {
    head: string;
    body: string;
    feet: string;
    hands: string;
}
export interface IOtherProfileEquipment {
    Id: string;
    Items: Item[];
}
export interface IOtherProfileStats {
    eft: IOtherProfileSubStats;
}
export interface IOtherProfileSubStats {
    totalInGameTime: number;
    overAllCounters: OverallCounters;
}
