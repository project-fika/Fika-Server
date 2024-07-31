import { IGlobals } from "@spt/models/eft/common/IGlobals";
import { ILocation } from "@spt/models/eft/common/ILocation";
import { IAchievement } from "@spt/models/eft/common/tables/IAchievement";
import { ICustomizationItem } from "@spt/models/eft/common/tables/ICustomizationItem";
import { IHandbookBase } from "@spt/models/eft/common/tables/IHandbookBase";
import { ILocationServices } from "@spt/models/eft/common/tables/ILocationServices";
import { IMatch } from "@spt/models/eft/common/tables/IMatch";
import { IProfileTemplates } from "@spt/models/eft/common/tables/IProfileTemplate";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ITrader } from "@spt/models/eft/common/tables/ITrader";
import { IBots } from "@spt/models/spt/bots/IBots";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { IHideout } from "@spt/models/spt/hideout/IHideout";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILocaleBase } from "@spt/models/spt/server/ILocaleBase";
import { ILocations } from "@spt/models/spt/server/ILocations";
import { IServerBase } from "@spt/models/spt/server/IServerBase";
import { ISettingsBase } from "@spt/models/spt/server/ISettingsBase";
import { ITemplates } from "@spt/models/spt/templates/ITemplates";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { LocalisationService } from "@spt/services/LocalisationService";
export declare class DatabaseService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected localisationService: LocalisationService;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, localisationService: LocalisationService);
    /**
     * @returns assets/database/
     */
    getTables(): IDatabaseTables;
    /**
     * @returns assets/database/bots/
     */
    getBots(): IBots;
    /**
     * @returns assets/database/globals.json
     */
    getGlobals(): IGlobals;
    /**
     * @returns assets/database/hideout/
     */
    getHideout(): IHideout;
    /**
     * @returns assets/database/locales/
     */
    getLocales(): ILocaleBase;
    /**
     * @returns assets/database/locations
     */
    getLocations(): ILocations;
    /**
     * Get specific location by its Id
     * @param locationId Desired location id
     * @returns assets/database/locations/
     */
    getLocation(locationId: string): ILocation;
    /**
     * @returns assets/database/match/
     */
    getMatch(): IMatch;
    /**
     * @returns assets/database/server.json
     */
    getServer(): IServerBase;
    /**
     * @returns assets/database/settings.json
     */
    getSettings(): ISettingsBase;
    /**
     * @returns assets/database/templates/
     */
    getTemplates(): ITemplates;
    /**
     * @returns assets/database/templates/achievements.json
     */
    getAchievements(): IAchievement[];
    /**
     * @returns assets/database/templates/customisation.json
     */
    getCustomization(): Record<string, ICustomizationItem>;
    /**
     * @returns assets/database/templates/items.json
     */
    getHandbook(): IHandbookBase;
    /**
     * @returns assets/database/templates/items.json
     */
    getItems(): Record<string, ITemplateItem>;
    /**
     * @returns assets/database/templates/prices.json
     */
    getPrices(): Record<string, number>;
    /**
     * @returns assets/database/templates/profiles.json
     */
    getProfiles(): IProfileTemplates;
    /**
     * @returns assets/database/templates/items.json
     */
    getQuests(): Record<string, IQuest>;
    /**
     * @returns assets/database/traders/
     */
    getTraders(): Record<string, ITrader>;
    /**
     * Get specific trader by their Id
     * @param traderId Desired trader id
     * @returns assets/database/traders/
     */
    getTrader(traderId: string): ITrader;
    /**
     * @returns assets/database/locationServices/
     */
    getLocationServices(): ILocationServices;
}
