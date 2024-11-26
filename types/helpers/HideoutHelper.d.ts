import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IBotHideoutArea, IHideoutImprovement, IProduction, IProductive } from "@spt/models/eft/common/tables/IBotBase";
import { IItem, IUpd } from "@spt/models/eft/common/tables/IItem";
import { IHideoutArea, IStageBonus } from "@spt/models/eft/hideout/IHideoutArea";
import { IHideoutContinuousProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutContinuousProductionStartRequestData";
import { IHideoutProduction } from "@spt/models/eft/hideout/IHideoutProduction";
import { IHideoutSingleProductionStartRequestData } from "@spt/models/eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutTakeProductionRequestData } from "@spt/models/eft/hideout/IHideoutTakeProductionRequestData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { HideoutAreas } from "@spt/models/enums/HideoutAreas";
import { SkillTypes } from "@spt/models/enums/SkillTypes";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { PlayerService } from "@spt/services/PlayerService";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class HideoutHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected databaseService: DatabaseService;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponse: HttpResponseUtil;
    protected profileHelper: ProfileHelper;
    protected inventoryHelper: InventoryHelper;
    protected playerService: PlayerService;
    protected localisationService: LocalisationService;
    protected itemHelper: ItemHelper;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    static bitcoinFarm: string;
    static cultistCircleCraftId: string;
    static bitcoinProductionId: string;
    static waterCollector: string;
    static maxSkillPoint: number;
    protected hideoutConfig: IHideoutConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, databaseService: DatabaseService, eventOutputHolder: EventOutputHolder, httpResponse: HttpResponseUtil, profileHelper: ProfileHelper, inventoryHelper: InventoryHelper, playerService: PlayerService, localisationService: LocalisationService, itemHelper: ItemHelper, configServer: ConfigServer, cloner: ICloner);
    /**
     * Add production to profiles' Hideout.Production array
     * @param pmcData Profile to add production to
     * @param body Production request
     * @param sessionID Session id
     * @returns client response
     */
    registerProduction(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData | IHideoutContinuousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * This convenience function initializes new Production Object
     * with all the constants.
     */
    initProduction(recipeId: string, productionTime: number, needFuelForAllProductionTime: boolean): IProduction;
    /**
     * Is the provided object a Production type
     * @param productive
     * @returns
     */
    isProductionType(productive: IProductive): productive is IProduction;
    /**
     * Apply bonus to player profile given after completing hideout upgrades
     * @param pmcData Profile to add bonus to
     * @param bonus Bonus to add to profile
     */
    applyPlayerUpgradesBonuses(pmcData: IPmcData, bonus: IStageBonus): void;
    /**
     * Process a players hideout, update areas that use resources + increment production timers
     * @param sessionID Session id
     */
    updatePlayerHideout(sessionID: string): void;
    /**
     * Get various properties that will be passed to hideout update-related functions
     * @param pmcData Player profile
     * @returns Properties
     */
    protected getHideoutProperties(pmcData: IPmcData): {
        btcFarmCGs: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter: boolean;
    };
    protected doesWaterCollectorHaveFilter(waterCollector: IBotHideoutArea): boolean;
    /**
     * Iterate over productions and update their progress timers
     * @param pmcData Profile to check for productions and update
     * @param hideoutProperties Hideout properties
     */
    protected updateProductionTimers(pmcData: IPmcData, hideoutProperties: {
        btcFarmCGs: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter: boolean;
    }): void;
    /**
     * Is a craft from a particular hideout area
     * @param craft Craft to check
     * @param hideoutType Type to check craft against
     * @returns True it is from that area
     */
    protected isCraftOfType(craft: IProduction, hideoutType: HideoutAreas): boolean;
    /**
     * Has the craft completed
     * Ignores bitcoin farm/cultist circle as they're continuous crafts
     * @param craft Craft to check

     * @returns True when craft is compelte
     */
    protected isCraftComplete(craft: IProduction): boolean;
    /**
     * Update progress timer for water collector
     * @param pmcData profile to update
     * @param productionId id of water collection production to update
     * @param hideoutProperties Hideout properties
     */
    protected updateWaterCollectorProductionTimer(pmcData: IPmcData, productionId: string, hideoutProperties: {
        btcFarmCGs?: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter: boolean;
    }): void;
    /**
     * Update a productions progress value based on the amount of time that has passed
     * @param pmcData Player profile
     * @param prodId Production id being crafted
     * @param recipe Recipe data being crafted
     * @param hideoutProperties
     */
    protected updateProductionProgress(pmcData: IPmcData, prodId: string, recipe: IHideoutProduction, hideoutProperties: {
        btcFarmCGs?: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter?: boolean;
    }): void;
    protected updateCultistCircleCraftProgress(pmcData: IPmcData, prodId: string): void;
    protected flagCultistCircleCraftAsComplete(production: IProductive): void;
    /**
     * Check if a productions progress value matches its corresponding recipes production time value
     * @param pmcData Player profile
     * @param prodId Production id
     * @param recipe Recipe being crafted
     * @returns progress matches productionTime from recipe
     */
    protected doesProgressMatchProductionTime(pmcData: IPmcData, prodId: string): boolean;
    /**
     * Update progress timer for scav case
     * @param pmcData Profile to update
     * @param productionId Id of scav case production to update
     */
    protected updateScavCaseProductionTimer(pmcData: IPmcData, productionId: string): void;
    /**
     * Iterate over hideout areas that use resources (fuel/filters etc) and update associated values
     * @param sessionID Session id
     * @param pmcData Profile to update areas of
     * @param hideoutProperties hideout properties
     */
    protected updateAreasWithResources(sessionID: string, pmcData: IPmcData, hideoutProperties: {
        btcFarmCGs: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter: boolean;
    }): void;
    /**
     * Decrease fuel from generator slots based on amount of time since last time this occured
     * @param generatorArea Hideout area
     * @param pmcData Player profile
     * @param isGeneratorOn Is the generator turned on since last update
     */
    protected updateFuel(generatorArea: IBotHideoutArea, pmcData: IPmcData, isGeneratorOn: boolean): void;
    protected updateWaterCollector(sessionId: string, pmcData: IPmcData, area: IBotHideoutArea, hideoutProperties: {
        btcFarmCGs: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter: boolean;
    }): void;
    /**
     * Get craft time and make adjustments to account for dev profile + crafting skill level
     * @param pmcData Player profile making craft
     * @param recipeId Recipe being crafted
     * @param applyHideoutManagementBonus should the hideout mgmt bonus be appled to the calculation
     * @returns Items craft time with bonuses subtracted
     */
    getAdjustedCraftTimeWithSkills(pmcData: IPmcData, recipeId: string, applyHideoutManagementBonus?: boolean): number;
    /**
     * Adjust water filter objects resourceValue or delete when they reach 0 resource
     * @param waterFilterArea water filter area to update
     * @param production production object
     * @param isGeneratorOn is generator enabled
     * @param pmcData Player profile
     */
    protected updateWaterFilters(waterFilterArea: IBotHideoutArea, production: IProduction, isGeneratorOn: boolean, pmcData: IPmcData): void;
    /**
     * Get an adjusted water filter drain rate based on time elapsed since last run,
     * handle edge case when craft time has gone on longer than total production time
     * @param secondsSinceServerTick Time passed
     * @param totalProductionTime Total time collecting water
     * @param productionProgress how far water collector has progressed
     * @param baseFilterDrainRate Base drain rate
     * @returns drain rate (adjusted)
     */
    protected getTimeAdjustedWaterFilterDrainRate(secondsSinceServerTick: number, totalProductionTime: number, productionProgress: number, baseFilterDrainRate: number): number;
    /**
     * Get the water filter drain rate based on hideout bonues player has
     * @param pmcData Player profile
     * @returns Drain rate
     */
    protected getWaterFilterDrainRate(pmcData: IPmcData): number;
    /**
     * Get the production time in seconds for the desired production
     * @param prodId Id, e.g. Water collector id
     * @returns seconds to produce item
     */
    protected getTotalProductionTimeSeconds(prodId: string): number;
    /**
     * Create a upd object using passed in parameters
     * @param stackCount
     * @param resourceValue
     * @param resourceUnitsConsumed
     * @returns Upd
     */
    protected getAreaUpdObject(stackCount: number, resourceValue: number, resourceUnitsConsumed: number, isFoundInRaid: boolean): IUpd;
    protected updateAirFilters(airFilterArea: IBotHideoutArea, pmcData: IPmcData, isGeneratorOn: boolean): void;
    protected updateBitcoinFarm(pmcData: IPmcData, btcProduction: IProductive, btcFarmCGs: number, isGeneratorOn: boolean): void;
    /**
     * Add bitcoin object to btc production products array and set progress time
     * @param btcProd Bitcoin production object
     * @param coinCraftTimeSeconds Time to craft a bitcoin
     */
    protected addBtcToProduction(btcProd: IProduction, coinCraftTimeSeconds: number): void;
    /**
     * Get number of ticks that have passed since hideout areas were last processed, reduced when generator is off
     * @param pmcData Player profile
     * @param isGeneratorOn Is the generator on for the duration of elapsed time
     * @param recipe Hideout production recipe being crafted we need the ticks for
     * @returns Amount of time elapsed in seconds
     */
    protected getTimeElapsedSinceLastServerTick(pmcData: IPmcData, isGeneratorOn: boolean, recipe?: IHideoutProduction): number;
    /**
     * Get a count of how many possible BTC can be gathered by the profile
     * @param pmcData Profile to look up
     * @returns Coin slot count
     */
    protected getBTCSlots(pmcData: IPmcData): number;
    /**
     * Get a count of how many additional bitcoins player hideout can hold with elite skill
     */
    protected getEliteSkillAdditionalBitcoinSlotCount(): number;
    /**
     * HideoutManagement skill gives a consumption bonus the higher the level
     * 0.5% per level per 1-51, (25.5% at max)
     * @param pmcData Profile to get hideout consumption level level from
     * @returns consumption bonus
     */
    protected getHideoutManagementConsumptionBonus(pmcData: IPmcData): number;
    /**
     * Get a multipler based on players skill level and value per level
     * @param pmcData Player profile
     * @param skill Player skill from profile
     * @param valuePerLevel Value from globals.config.SkillsSettings - `PerLevel`
     * @returns Multipler from 0 to 1
     */
    protected getSkillBonusMultipliedBySkillLevel(pmcData: IPmcData, skill: SkillTypes, valuePerLevel: number): number;
    /**
     * @param pmcData Player profile
     * @param productionTime Time to complete hideout craft in seconds
     * @param skill Skill bonus to get reduction from
     * @param amountPerLevel Skill bonus amount to apply
     * @returns Seconds to reduce craft time by
     */
    getSkillProductionTimeReduction(pmcData: IPmcData, productionTime: number, skill: SkillTypes, amountPerLevel: number): number;
    isProduction(productive: IProductive): productive is IProduction;
    /**
     * Gather crafted BTC from hideout area and add to inventory
     * Reset production start timestamp if hideout area at full coin capacity
     * @param pmcData Player profile
     * @param request Take production request
     * @param sessionId Session id
     * @param output Output object to update
     */
    getBTC(pmcData: IPmcData, request: IHideoutTakeProductionRequestData, sessionId: string, output: IItemEventRouterResponse): void;
    /**
     * Upgrade hideout wall from starting level to interactable level if necessary stations have been upgraded
     * @param pmcProfile Profile to upgrade wall in
     */
    unlockHideoutWallInProfile(pmcProfile: IPmcData): void;
    /**
     * Hideout improvement is flagged as complete
     * @param improvement hideout improvement object
     * @returns true if complete
     */
    protected hideoutImprovementIsComplete(improvement: IHideoutImprovement): boolean;
    /**
     * Iterate over hideout improvements not completed and check if they need to be adjusted
     * @param pmcProfile Profile to adjust
     */
    setHideoutImprovementsToCompleted(pmcProfile: IPmcData): void;
    /**
     * Add/remove bonus combat skill based on number of dogtags in place of fame hideout area
     * @param pmcData Player profile
     */
    applyPlaceOfFameDogtagBonus(pmcData: IPmcData): void;
    /**
     * Calculate the raw dogtag combat skill bonus for place of fame based on number of dogtags
     * Reverse engineered from client code
     * @param pmcData Player profile
     * @param activeDogtags Active dogtags in place of fame dogtag slots
     * @returns combat bonus
     */
    protected getDogtagCombatSkillBonusPercent(pmcData: IPmcData, activeDogtags: IItem[]): number;
    /**
     * The wall pollutes a profile with various temp buffs/debuffs,
     * Remove them all
     * @param wallAreaDb Hideout area data
     * @param pmcData Player profile
     */
    removeHideoutWallBuffsAndDebuffs(wallAreaDb: IHideoutArea, pmcData: IPmcData): void;
}
