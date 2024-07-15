import { IAchievement } from "@spt/models/eft/common/tables/IAchievement";
import { ICustomizationItem } from "@spt/models/eft/common/tables/ICustomizationItem";
import { IHandbookBase } from "@spt/models/eft/common/tables/IHandbookBase";
import { IProfileTemplates } from "@spt/models/eft/common/tables/IProfileTemplate";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IRepeatableQuestDatabase } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IDefaultEquipmentPreset } from "@spt/models/eft/profile/ISptProfile";
export interface ITemplates {
    character: string[];
    items: Record<string, ITemplateItem>;
    quests: Record<string, IQuest>;
    repeatableQuests: IRepeatableQuestDatabase;
    handbook: IHandbookBase;
    customization: Record<string, ICustomizationItem>;
    /** The profile templates listed in the launcher on profile creation, split by account type (e.g. Standard) then side (e.g. bear/usec) */
    profiles: IProfileTemplates;
    /** Flea prices of items - gathered from online flea market dump */
    prices: Record<string, number>;
    /** Default equipment loadouts that show on main inventory screen */
    defaultEquipmentPresets: IDefaultEquipmentPreset[];
    /** Achievements */
    achievements: IAchievement[];
}
