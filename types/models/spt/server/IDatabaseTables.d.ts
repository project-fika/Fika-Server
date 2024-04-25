import { IGlobals } from "@spt-aki/models/eft/common/IGlobals";
import { IAchievement } from "@spt-aki/models/eft/common/tables/IAchievement";
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import { IBotCore } from "@spt-aki/models/eft/common/tables/IBotCore";
import { IBotType } from "@spt-aki/models/eft/common/tables/IBotType";
import { ICustomizationItem } from "@spt-aki/models/eft/common/tables/ICustomizationItem";
import { IHandbookBase } from "@spt-aki/models/eft/common/tables/IHandbookBase";
import { ILootBase } from "@spt-aki/models/eft/common/tables/ILootBase";
import { IMatch } from "@spt-aki/models/eft/common/tables/IMatch";
import { IProfileTemplates } from "@spt-aki/models/eft/common/tables/IProfileTemplate";
import { IQuest } from "@spt-aki/models/eft/common/tables/IQuest";
import { IRepeatableQuestDatabase } from "@spt-aki/models/eft/common/tables/IRepeatableQuests";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { ITrader } from "@spt-aki/models/eft/common/tables/ITrader";
import { IHideoutArea } from "@spt-aki/models/eft/hideout/IHideoutArea";
import { IHideoutProduction } from "@spt-aki/models/eft/hideout/IHideoutProduction";
import { IHideoutScavCase } from "@spt-aki/models/eft/hideout/IHideoutScavCase";
import { IHideoutSettingsBase } from "@spt-aki/models/eft/hideout/IHideoutSettingsBase";
import { IQteData } from "@spt-aki/models/eft/hideout/IQteData";
import { IDefaultEquipmentPreset } from "@spt-aki/models/eft/profile/IAkiProfile";
import { ILocaleBase } from "@spt-aki/models/spt/server/ILocaleBase";
import { ILocations } from "@spt-aki/models/spt/server/ILocations";
import { IServerBase } from "@spt-aki/models/spt/server/IServerBase";
import { ISettingsBase } from "@spt-aki/models/spt/server/ISettingsBase";
export interface IDatabaseTables {
    bots?: {
        types: Record<string, IBotType>;
        base: IBotBase;
        core: IBotCore;
    };
    hideout?: {
        areas: IHideoutArea[];
        production: IHideoutProduction[];
        scavcase: IHideoutScavCase[];
        settings: IHideoutSettingsBase;
        qte: IQteData[];
    };
    locales?: ILocaleBase;
    locations?: ILocations;
    loot?: ILootBase;
    match?: IMatch;
    templates?: {
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
    };
    traders?: Record<string, ITrader>;
    globals?: IGlobals;
    server?: IServerBase;
    settings?: ISettingsBase;
}
