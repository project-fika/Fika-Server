import type { IAchievement } from "@spt/models/eft/common/tables/IAchievement";
import type { ICustomisationStorage } from "@spt/models/eft/common/tables/ICustomisationStorage";
import type { ICustomizationItem } from "@spt/models/eft/common/tables/ICustomizationItem";
import type { IHandbookBase } from "@spt/models/eft/common/tables/IHandbookBase";
import type { ILocationServices } from "@spt/models/eft/common/tables/ILocationServices";
import type { IPrestige } from "@spt/models/eft/common/tables/IPrestige";
import type { IProfileTemplates } from "@spt/models/eft/common/tables/IProfileTemplate";
import type { IQuest } from "@spt/models/eft/common/tables/IQuest";
import type { IRepeatableQuestDatabase } from "@spt/models/eft/common/tables/IRepeatableQuests";
import type { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import type { IDefaultEquipmentPreset } from "@spt/models/eft/profile/ISptProfile";
export interface ITemplates {
    character: string[];
    customisationStorage: ICustomisationStorage[];
    items: Record<string, ITemplateItem>;
    prestige: IPrestige;
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
    /** Custom Achievements not from BSG PvE - Added to `achievements` on server start */
    customAchievements: IAchievement[];
    /** Location services data */
    locationServices: ILocationServices;
}
