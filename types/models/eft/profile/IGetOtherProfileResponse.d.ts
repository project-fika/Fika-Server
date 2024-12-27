import type { IOverallCounters, ISkills } from "@spt/models/eft/common/tables/IBotBase";
import type { IItem } from "@spt/models/eft/common/tables/IItem";
export interface IGetOtherProfileResponse {
    id: string;
    aid: number;
    info: IOtherProfileInfo;
    customization: IOtherProfileCustomization;
    skills: ISkills;
    equipment: IOtherProfileEquipment;
    achievements: Record<string, number>;
    favoriteItems: IItem[];
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
    dogtag: string;
}
export interface IOtherProfileEquipment {
    Id: string;
    Items: IItem[];
}
export interface IOtherProfileStats {
    eft: IOtherProfileSubStats;
}
export interface IOtherProfileSubStats {
    totalInGameTime: number;
    overAllCounters: IOverallCounters;
}
