import { Ixyz } from "@spt/models/eft/common/Ixyz";
import { Item } from "@spt/models/eft/common/tables/IItem";
export interface IGlobals {
    time: number;
    config: IConfig;
    bot_presets: IBotPreset[];
    AudioSettings: IAudioSettings;
    EnvironmentSettings: IEnvironmentSettings;
    BotWeaponScatterings: IBotWeaponScattering[];
    ItemPresets: Record<string, IPreset>;
}
export interface IConfig {
    content: IContent;
    AimPunchMagnitude: number;
    WeaponSkillProgressRate: number;
    SkillAtrophy: boolean;
    exp: IExp;
    t_base_looting: number;
    t_base_lockpicking: number;
    armor: IArmor;
    SessionsToShowHotKeys: number;
    MaxBotsAliveOnMap: number;
    MaxBotsAliveOnMapPvE: number;
    SavagePlayCooldown: number;
    SavagePlayCooldownNdaFree: number;
    MarksmanAccuracy: number;
    SavagePlayCooldownDevelop: number;
    TODSkyDate: string;
    Mastering: IMastering[];
    GlobalItemPriceModifier: number;
    TradingUnlimitedItems: boolean;
    MaxLoyaltyLevelForAll: boolean;
    GlobalLootChanceModifier: number;
    GraphicSettings: IGraphicSettings;
    TimeBeforeDeploy: number;
    TimeBeforeDeployLocal: number;
    TradingSetting: number;
    TradingSettings: ITradingSettings;
    ItemsCommonSettings: IItemsCommonSettings;
    LoadTimeSpeedProgress: number;
    BaseLoadTime: number;
    BaseUnloadTime: number;
    BaseCheckTime: number;
    BluntDamageReduceFromSoftArmorMod: number;
    BodyPartColliderSettings: IBodyPartColliderSettings;
    Customization: ICustomization;
    UncheckOnShot: boolean;
    BotsEnabled: boolean;
    BufferZone: IBufferZone;
    ArmorMaterials: IArmorMaterials;
    ArenaEftTransferSettings: IArenaEftTransferSettings;
    LegsOverdamage: number;
    HandsOverdamage: number;
    StomachOverdamage: number;
    Health: IHealth;
    rating: IRating;
    tournament: ITournament;
    QuestSettings: IQuestSettings;
    RagFair: IRagFair;
    handbook: IHandbook;
    FractureCausedByFalling: IProbability;
    FractureCausedByBulletHit: IProbability;
    WAVE_COEF_LOW: number;
    WAVE_COEF_MID: number;
    WAVE_COEF_HIGH: number;
    WAVE_COEF_HORDE: number;
    Stamina: IStamina;
    StaminaRestoration: IStaminaRestoration;
    StaminaDrain: IStaminaDrain;
    RequirementReferences: IRequirementReferences;
    RestrictionsInRaid: IRestrictionsInRaid[];
    SkillMinEffectiveness: number;
    SkillFatiguePerPoint: number;
    SkillFreshEffectiveness: number;
    SkillFreshPoints: number;
    SkillPointsBeforeFatigue: number;
    SkillFatigueReset: number;
    DiscardLimitsEnabled: boolean;
    EnvironmentSettings: IEnvironmentSetting2;
    EventSettings: IEventSettings;
    FavoriteItemsSettings: IFavoriteItemsSettings;
    VaultingSettings: IVaultingSettings;
    BTRSettings: IBTRSettings;
    EventType: string[];
    WalkSpeed: Ixyz;
    SprintSpeed: Ixyz;
    SquadSettings: ISquadSettings;
    SkillEnduranceWeightThreshold: number;
    TeamSearchingTimeout: number;
    Insurance: IInsurance;
    SkillExpPerLevel: number;
    GameSearchingTimeout: number;
    WallContusionAbsorption: Ixyz;
    WeaponFastDrawSettings: IWeaponFastDrawSettings;
    SkillsSettings: ISkillsSettings;
    AzimuthPanelShowsPlayerOrientation: boolean;
    Aiming: IAiming;
    Malfunction: IMalfunction;
    Overheat: IOverheat;
    FenceSettings: IFenceSettings;
    TestValue: number;
    Inertia: IInertia;
    Ballistic: IBallistic;
    RepairSettings: IRepairSettings;
}
export interface IEnvironmentSetting2 {
    EnvironmentUIData: IEnvironmentUIData;
}
export interface IEnvironmentUIData {
    TheUnheardEditionEnvironmentUiType: string[];
}
export interface IBodyPartColliderSettings {
    BackHead: IBodyPartColliderPart;
    Ears: IBodyPartColliderPart;
    Eyes: IBodyPartColliderPart;
    HeadCommon: IBodyPartColliderPart;
    Jaw: IBodyPartColliderPart;
    LeftCalf: IBodyPartColliderPart;
    LeftForearm: IBodyPartColliderPart;
    LeftSideChestDown: IBodyPartColliderPart;
    LeftSideChestUp: IBodyPartColliderPart;
    LeftThigh: IBodyPartColliderPart;
    LeftUpperArm: IBodyPartColliderPart;
    NeckBack: IBodyPartColliderPart;
    NeckFront: IBodyPartColliderPart;
    ParietalHead: IBodyPartColliderPart;
    Pelvis: IBodyPartColliderPart;
    PelvisBack: IBodyPartColliderPart;
    RibcageLow: IBodyPartColliderPart;
    RibcageUp: IBodyPartColliderPart;
    RightCalf: IBodyPartColliderPart;
    RightForearm: IBodyPartColliderPart;
    RightSideChestDown: IBodyPartColliderPart;
    RightSideChestUp: IBodyPartColliderPart;
    RightThigh: IBodyPartColliderPart;
    RightUpperArm: IBodyPartColliderPart;
    SpineDown: IBodyPartColliderPart;
    SpineTop: IBodyPartColliderPart;
}
export interface IBodyPartColliderPart {
    PenetrationChance: number;
    PenetrationDamageMod: number;
    PenetrationLevel: number;
}
export interface IWeaponFastDrawSettings {
    HandShakeCurveFrequency: number;
    HandShakeCurveIntensity: number;
    HandShakeMaxDuration: number;
    HandShakeTremorIntensity: number;
    WeaponFastSwitchMaxSpeedMult: number;
    WeaponFastSwitchMinSpeedMult: number;
    WeaponPistolFastSwitchMaxSpeedMult: number;
    WeaponPistolFastSwitchMinSpeedMult: number;
}
export interface IEventSettings {
    EventActive: boolean;
    EventTime: number;
    EventWeather: IEventWeather;
    ExitTimeMultiplier: number;
    StaminaMultiplier: number;
    SummonFailedWeather: IEventWeather;
    SummonSuccessWeather: IEventWeather;
    WeatherChangeTime: number;
}
export interface IEventWeather {
    Cloudness: number;
    Hour: number;
    Minute: number;
    Rain: number;
    RainRandomness: number;
    ScaterringFogDensity: number;
    TopWindDirection: Ixyz;
    Wind: number;
    WindDirection: number;
}
export interface IGraphicSettings {
    ExperimentalFogInCity: boolean;
}
export interface IBufferZone {
    CustomerAccessTime: number;
    CustomerCriticalTimeStart: number;
    CustomerKickNotifTime: number;
}
export interface IItemsCommonSettings {
    ItemRemoveAfterInterruptionTime: number;
}
export interface ITradingSettings {
    BuyRestrictionMaxBonus: Record<string, IBuyRestrictionMaxBonus>;
    BuyoutRestrictions: IBuyoutRestrictions;
}
export interface IBuyRestrictionMaxBonus {
    multiplier: number;
}
export interface IBuyoutRestrictions {
    MinDurability: number;
    MinFoodDrinkResource: number;
    MinMedsResource: number;
}
export interface IContent {
    ip: string;
    port: number;
    root: string;
}
export interface IExp {
    heal: IHeal;
    match_end: IMatchEnd;
    kill: IKill;
    level: ILevel;
    loot_attempts: ILootAttempt[];
    expForLevelOneDogtag: number;
    expForLockedDoorOpen: number;
    expForLockedDoorBreach: number;
    triggerMult: number;
}
export interface IHeal {
    expForHeal: number;
    expForHydration: number;
    expForEnergy: number;
}
export interface IMatchEnd {
    README: string;
    survived_exp_requirement: number;
    survived_seconds_requirement: number;
    survived_exp_reward: number;
    mia_exp_reward: number;
    runner_exp_reward: number;
    leftMult: number;
    miaMult: number;
    survivedMult: number;
    runnerMult: number;
    killedMult: number;
}
export interface IKill {
    combo: ICombo[];
    victimLevelExp: number;
    headShotMult: number;
    expOnDamageAllHealth: number;
    longShotDistance: number;
    bloodLossToLitre: number;
    botExpOnDamageAllHealth: number;
    botHeadShotMult: number;
    victimBotLevelExp: number;
    pmcExpOnDamageAllHealth: number;
    pmcHeadShotMult: number;
}
export interface ICombo {
    percent: number;
}
export interface ILevel {
    exp_table: IExpTable[];
    trade_level: number;
    savage_level: number;
    clan_level: number;
    mastering1: number;
    mastering2: number;
}
export interface IExpTable {
    exp: number;
}
export interface ILootAttempt {
    k_exp: number;
}
export interface IArmor {
    class: IClass[];
}
export interface IClass {
    resistance: number;
}
export interface IMastering {
    Name: string;
    Templates: string[];
    Level2: number;
    Level3: number;
}
export interface ICustomization {
    SavageHead: ISavageHead;
    SavageBody: ISavageBody;
    SavageFeet: ISavageFeet;
    CustomizationVoice: ICustomizationVoice[];
    BodyParts: IBodyParts;
}
export interface ISavageHead {
    wild_head_1: IWildHead;
    wild_head_2: IWildHead;
    wild_head_3: IWildHead;
    Wild_Dealmaker_head: IWildHead;
    Wild_Killa_head: IWildHead;
    bear_head: IWildHead;
    bear_head_1: IWildHead;
    usec_head_1: IWildHead;
    Head_BOSS_Glukhar: IWildHead;
    Wild_Head_nonMesh: IWildHead;
    Head_BOSS_Sanitar: IWildHead;
    wild_head_drozd: IWildHead;
    wild_head_misha: IWildHead;
    head_cultist_01: IWildHead;
    head_cultist_02: IWildHead;
    head_cultist_03: IWildHead;
    DefaultUsecHead: IWildHead;
    usec_head_3: IWildHead;
    usec_head_4: IWildHead;
    usec_head_5: IWildHead;
}
export interface IWildHead {
    head: string;
    isNotRandom: boolean;
    NotRandom: boolean;
}
export interface ISavageBody {
    wild_body: IWildBody;
    wild_body_1: IWildBody;
    wild_body_2: IWildBody;
    wild_body_3: IWildBody;
    Wild_Dealmaker_body: IWildBody;
    wild_security_body_1: IWildBody;
    wild_security_body_2: IWildBody;
    wild_Killa_body: IWildBody;
    wild_pmcBot_body: IWildBody;
    wild_Shturman_body: IWildBody;
    wild_Gluhar_body: IWildBody;
    Tshirt_security_TshirtTatu_01: IWildBody;
    Tshirt_security_TshirtTatu_02: IWildBody;
    Top_security_Husky: IWildBody;
    Top_security_Gorka4: IWildBody;
    scav_kit_upper_meteor: IWildBody;
    wild_body_russia1: IWildBody;
    Top_BOSS_Sanitar: IWildBody;
    wild_body_motocross: IWildBody;
    top_cultist_01: IWildBody;
    top_cultist_02: IWildBody;
    wild_body_rainparka: IWildBody;
    wild_body_underarmour: IWildBody;
    top_boss_tagilla: IWildBody;
    DefaultUsecBody: IWildBody;
    usec_upper_acu: IWildBody;
    usec_upper_commando: IWildBody;
    usec_upper_aggressor: IWildBody;
    usec_upper_hoody: IWildBody;
    usec_upper_pcuironsight: IWildBody;
    usec_top_beltstaff: IWildBody;
    usec_upper_flexion: IWildBody;
    usec_upper_tier3: IWildBody;
    usec_upper_pcsmulticam: IWildBody;
    usec_upper_tier_2: IWildBody;
    usec_upper_infiltrator: IWildBody;
    user_upper_NightPatrol: IWildBody;
    wild_body_bomber: IWildBody;
    wild_top_yellowcoat: IWildBody;
}
export interface IWildBody {
    body: string;
    hands: string;
    isNotRandom: boolean;
}
export interface ISavageFeet {
    wild_feet: IWildFeet;
    wild_feet_1: IWildFeet;
    wild_feet_2: IWildFeet;
    Wild_Dealmaker_feet: IWildFeet;
    wild_security_feet_1: IWildFeet;
    Wild_Killa_feet: IWildFeet;
    wild_pmcBot_feet: IWildFeet;
    Pants_BOSS_Glukhar: IWildFeet;
    Pants_BOSS_Shturman: IWildFeet;
    Pants_security_Gorka4: IWildFeet;
    Pants_security_Flora: IWildFeet;
    scav_kit_lower_sklon: IWildFeet;
    Pants_BOSS_Sanitar: IWildFeet;
    wild_feet_sweatpants: IWildFeet;
    wild_feet_wasatch: IWildFeet;
    wild_feet_slimPants: IWildFeet;
    pants_cultist_01: IWildFeet;
    pants_cultist_02: IWildFeet;
    wild_feet_scavelite_taclite: IWildFeet;
    pants_boss_tagilla: IWildFeet;
    wild_feet_bomber: IWildFeet;
    wild_pants_yellowcoat: IWildFeet;
}
export interface IWildFeet {
    feet: string;
    isNotRandom: boolean;
    NotRandom: boolean;
}
export interface ICustomizationVoice {
    voice: string;
    side: string[];
    isNotRandom: boolean;
}
export interface IBodyParts {
    Head: string;
    Body: string;
    Feet: string;
    Hands: string;
}
export interface IArenaEftTransferSettings {
    ArenaEftTransferSettings: ArenaEftTransferSettings;
}
export interface ArenaEftTransferSettings {
    ArenaManagerReputationTaxMultiplier: number;
    CharismaTaxMultiplier: number;
    CreditPriceTaxMultiplier: number;
    RubTaxMultiplier: number;
    TransferLimitsByGameEdition: Record<string, number>;
    TransferLimitsSettings: Record<string, number>;
}
export interface IArmorMaterials {
    UHMWPE: IArmorType;
    Aramid: IArmorType;
    Combined: IArmorType;
    Titan: IArmorType;
    Aluminium: IArmorType;
    ArmoredSteel: IArmorType;
    Ceramic: IArmorType;
    Glass: IArmorType;
}
export interface IArmorType {
    Destructibility: number;
    MinRepairDegradation: number;
    MaxRepairDegradation: number;
    ExplosionDestructibility: number;
    MinRepairKitDegradation: number;
    MaxRepairKitDegradation: number;
}
export interface IHealth {
    Falling: IFalling;
    Effects: IEffects;
    HealPrice: IHealPrice;
    ProfileHealthSettings: IProfileHealthSettings;
}
export interface IFalling {
    DamagePerMeter: number;
    SafeHeight: number;
}
export interface IEffects {
    Existence: IExistence;
    Dehydration: IDehydration;
    BreakPart: IBreakPart;
    Contusion: IContusion;
    Disorientation: IDisorientation;
    Exhaustion: IExhaustion;
    LowEdgeHealth: ILowEdgeHealth;
    RadExposure: IRadExposure;
    Stun: IStun;
    Intoxication: Intoxication;
    Regeneration: IRegeneration;
    Wound: IWound;
    Berserk: IBerserk;
    Flash: IFlash;
    MedEffect: IMedEffect;
    Pain: IPain;
    PainKiller: IPainKiller;
    SandingScreen: ISandingScreen;
    MildMusclePain: IMusclePainEffect;
    SevereMusclePain: IMusclePainEffect;
    Stimulator: IStimulator;
    Tremor: ITremor;
    ChronicStaminaFatigue: IChronicStaminaFatigue;
    Fracture: IFracture;
    HeavyBleeding: IHeavyBleeding;
    LightBleeding: ILightBleeding;
    BodyTemperature: IBodyTemperature;
}
export interface IExistence {
    EnergyLoopTime: number;
    HydrationLoopTime: number;
    EnergyDamage: number;
    HydrationDamage: number;
    DestroyedStomachEnergyTimeFactor: number;
    DestroyedStomachHydrationTimeFactor: number;
}
export interface IDehydration {
    DefaultDelay: number;
    DefaultResidueTime: number;
    BleedingHealth: number;
    BleedingLoopTime: number;
    BleedingLifeTime: number;
    DamageOnStrongDehydration: number;
    StrongDehydrationLoopTime: number;
}
export interface IBreakPart {
    DefaultDelay: number;
    DefaultResidueTime: number;
    HealExperience: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovePrice: number;
    RemovedAfterDeath: boolean;
    BulletHitProbability: IProbability;
    FallingProbability: IProbability;
}
export interface IContusion {
    Dummy: number;
}
export interface IDisorientation {
    Dummy: number;
}
export interface IExhaustion {
    DefaultDelay: number;
    DefaultResidueTime: number;
    Damage: number;
    DamageLoopTime: number;
}
export interface ILowEdgeHealth {
    DefaultDelay: number;
    DefaultResidueTime: number;
    StartCommonHealth: number;
}
export interface IRadExposure {
    Damage: number;
    DamageLoopTime: number;
}
export interface IStun {
    Dummy: number;
}
export interface Intoxication {
    DefaultDelay: number;
    DefaultResidueTime: number;
    DamageHealth: number;
    HealthLoopTime: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovedAfterDeath: boolean;
    HealExperience: number;
    RemovePrice: number;
}
export interface IRegeneration {
    LoopTime: number;
    MinimumHealthPercentage: number;
    Energy: number;
    Hydration: number;
    BodyHealth: IBodyHealth;
    Influences: IInfluences;
}
export interface IBodyHealth {
    Head: IBodyHealthValue;
    Chest: IBodyHealthValue;
    Stomach: IBodyHealthValue;
    LeftArm: IBodyHealthValue;
    RightArm: IBodyHealthValue;
    LeftLeg: IBodyHealthValue;
    RightLeg: IBodyHealthValue;
}
export interface IBodyHealthValue {
    Value: number;
}
export interface IInfluences {
    LightBleeding: IInfluence;
    HeavyBleeding: IInfluence;
    Fracture: IInfluence;
    RadExposure: IInfluence;
    Intoxication: IInfluence;
}
export interface IInfluence {
    HealthSlowDownPercentage: number;
    EnergySlowDownPercentage: number;
    HydrationSlowDownPercentage: number;
}
export interface IWound {
    WorkingTime: number;
    ThresholdMin: number;
    ThresholdMax: number;
}
export interface IBerserk {
    DefaultDelay: number;
    WorkingTime: number;
    DefaultResidueTime: number;
}
export interface IFlash {
    Dummy: number;
}
export interface IMedEffect {
    LoopTime: number;
    StartDelay: number;
    DrinkStartDelay: number;
    FoodStartDelay: number;
    DrugsStartDelay: number;
    MedKitStartDelay: number;
    MedicalStartDelay: number;
    StimulatorStartDelay: number;
}
export interface IPain {
    TremorDelay: number;
    HealExperience: number;
}
export interface IPainKiller {
    Dummy: number;
}
export interface ISandingScreen {
    Dummy: number;
}
export interface IMusclePainEffect {
    GymEffectivity: number;
    OfflineDurationMax: number;
    OfflineDurationMin: number;
    TraumaChance: number;
}
export interface IStimulator {
    BuffLoopTime: number;
    Buffs: IBuffs;
}
export interface IBuffs {
    BuffsSJ1TGLabs: IBuff[];
    BuffsSJ6TGLabs: IBuff[];
    BuffsPropital: IBuff[];
    BuffsZagustin: IBuff[];
    BuffseTGchange: IBuff[];
    BuffsAdrenaline: IBuff[];
    BuffsGoldenStarBalm: IBuff[];
    Buffs_drink_aquamari: IBuff[];
    Buffs_drink_maxenergy: IBuff[];
    Buffs_drink_milk: IBuff[];
    Buffs_drink_tarcola: IBuff[];
    Buffs_drink_hotrod: IBuff[];
    Buffs_drink_juice_army: IBuff[];
    Buffs_drink_water: IBuff[];
    Buffs_food_borodinskiye: IBuff[];
    Buffs_food_condensed_milk: IBuff[];
    Buffs_food_emelya: IBuff[];
    Buffs_food_mayonez: IBuff[];
    Buffs_food_mre: IBuff[];
    Buffs_food_sugar: IBuff[];
    Buffs_drink_vodka: IBuff[];
    Buffs_drink_jack: IBuff[];
    Buffs_drink_moonshine: IBuff[];
    Buffs_drink_purewater: IBuff[];
    Buffs_3bTG: IBuff[];
    Buffs_AHF1M: IBuff[];
    Buffs_L1: IBuff[];
    Buffs_MULE: IBuff[];
    Buffs_Meldonin: IBuff[];
    Buffs_Obdolbos: IBuff[];
    Buffs_P22: IBuff[];
    Buffs_KultistsToxin: IBuff[];
    Buffs_BodyTemperature: IBuff[];
    Buffs_Antidote: IBuff[];
    Buffs_melee_bleed: IBuff[];
    Buffs_melee_blunt: IBuff[];
    Buffs_hultafors: IBuff[];
    Buffs_drink_vodka_BAD: IBuff[];
    Buffs_food_alyonka: IBuff[];
    Buffs_food_slippers: IBuff[];
    Buffs_knife: IBuff[];
    Buffs_EndOfWinterBonfire: IBuff[];
}
export interface IBuff {
    BuffType: string;
    Chance: number;
    Delay: number;
    Duration: number;
    Value: number;
    AbsoluteValue: boolean;
    SkillName: string;
}
export interface ITremor {
    DefaultDelay: number;
    DefaultResidueTime: number;
}
export interface IChronicStaminaFatigue {
    EnergyRate: number;
    WorkingTime: number;
    TicksEvery: number;
    EnergyRatePerStack: number;
}
export interface IFracture {
    DefaultDelay: number;
    DefaultResidueTime: number;
    HealExperience: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovePrice: number;
    RemovedAfterDeath: boolean;
    BulletHitProbability: IProbability;
    FallingProbability: IProbability;
}
export interface IHeavyBleeding {
    DefaultDelay: number;
    DefaultResidueTime: number;
    DamageEnergy: number;
    DamageHealth: number;
    EnergyLoopTime: number;
    HealthLoopTime: number;
    DamageHealthDehydrated: number;
    HealthLoopTimeDehydrated: number;
    LifeTimeDehydrated: number;
    EliteVitalityDuration: number;
    HealExperience: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovePrice: number;
    RemovedAfterDeath: boolean;
    Probability: IProbability;
}
export interface IProbability {
    FunctionType: string;
    K: number;
    B: number;
    Threshold: number;
}
export interface ILightBleeding {
    DefaultDelay: number;
    DefaultResidueTime: number;
    DamageEnergy: number;
    DamageHealth: number;
    EnergyLoopTime: number;
    HealthLoopTime: number;
    DamageHealthDehydrated: number;
    HealthLoopTimeDehydrated: number;
    LifeTimeDehydrated: number;
    EliteVitalityDuration: number;
    HealExperience: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovePrice: number;
    RemovedAfterDeath: boolean;
    Probability: IProbability;
}
export interface IBodyTemperature {
    DefaultBuildUpTime: number;
    DefaultResidueTime: number;
    LoopTime: number;
}
export interface IHealPrice {
    HealthPointPrice: number;
    HydrationPointPrice: number;
    EnergyPointPrice: number;
    TrialLevels: number;
    TrialRaids: number;
}
export interface IProfileHealthSettings {
    BodyPartsSettings: IBodyPartsSettings;
    HealthFactorsSettings: IHealthFactorsSettings;
    DefaultStimulatorBuff: string;
}
export interface IBodyPartsSettings {
    Head: IBodyPartsSetting;
    Chest: IBodyPartsSetting;
    Stomach: IBodyPartsSetting;
    LeftArm: IBodyPartsSetting;
    RightArm: IBodyPartsSetting;
    LeftLeg: IBodyPartsSetting;
    RightLeg: IBodyPartsSetting;
}
export interface IBodyPartsSetting {
    Minimum: number;
    Maximum: number;
    Default: number;
    EnvironmentDamageMultiplier: number;
    OverDamageReceivedMultiplier: number;
}
export interface IHealthFactorsSettings {
    Energy: IHealthFactorSetting;
    Hydration: IHealthFactorSetting;
    Temperature: IHealthFactorSetting;
    Poisoning: IHealthFactorSetting;
    Radiation: IHealthFactorSetting;
}
export interface IHealthFactorSetting {
    Minimum: number;
    Maximum: number;
    Default: number;
}
export interface IRating {
    levelRequired: number;
    limit: number;
    categories: ICategories;
}
export interface ICategories {
    experience: boolean;
    kd: boolean;
    surviveRatio: boolean;
    avgEarnings: boolean;
    pmcKills: boolean;
    raidCount: boolean;
    longestShot: boolean;
    timeOnline: boolean;
    inventoryFullCost: boolean;
    ragFairStanding: boolean;
}
export interface ITournament {
    categories: ITournamentCategories;
    limit: number;
    levelRequired: number;
}
export interface ITournamentCategories {
    dogtags: boolean;
}
export interface IRagFair {
    enabled: boolean;
    priceStabilizerEnabled: boolean;
    includePveTraderSales: boolean;
    priceStabilizerStartIntervalInHours: number;
    minUserLevel: number;
    communityTax: number;
    communityItemTax: number;
    communityRequirementTax: number;
    offerPriorityCost: number;
    offerDurationTimeInHour: number;
    offerDurationTimeInHourAfterRemove: number;
    priorityTimeModifier: number;
    maxRenewOfferTimeInHour: number;
    renewPricePerHour: number;
    maxActiveOfferCount: IMaxActiveOfferCount[];
    balancerRemovePriceCoefficient: number;
    balancerMinPriceCount: number;
    balancerAveragePriceCoefficient: number;
    delaySinceOfferAdd: number;
    uniqueBuyerTimeoutInDays: number;
    ratingSumForIncrease: number;
    ratingIncreaseCount: number;
    ratingSumForDecrease: number;
    ratingDecreaseCount: number;
    maxSumForIncreaseRatingPerOneSale: number;
    maxSumForDecreaseRatingPerOneSale: number;
    maxSumForRarity: IMaxSumForRarity;
    ChangePriceCoef: number;
    balancerUserItemSaleCooldownEnabled: boolean;
    balancerUserItemSaleCooldown: number;
    youSellOfferMaxStorageTimeInHour: number;
    yourOfferDidNotSellMaxStorageTimeInHour: number;
    isOnlyFoundInRaidAllowed: boolean;
    sellInOnePiece: number;
}
export interface IMaxActiveOfferCount {
    from: number;
    to: number;
    count: number;
    countForSpecialEditions: number;
}
export interface IMaxSumForRarity {
    Common: IRarityMaxSum;
    Rare: IRarityMaxSum;
    Superrare: IRarityMaxSum;
    Not_exist: IRarityMaxSum;
}
export interface IRarityMaxSum {
    value: number;
}
export interface IHandbook {
    defaultCategory: string;
}
export interface IStamina {
    Capacity: number;
    SprintDrainRate: number;
    BaseRestorationRate: number;
    JumpConsumption: number;
    GrenadeHighThrow: number;
    GrenadeLowThrow: number;
    AimDrainRate: number;
    AimRangeFinderDrainRate: number;
    OxygenCapacity: number;
    OxygenRestoration: number;
    WalkOverweightLimits: Ixyz;
    BaseOverweightLimits: Ixyz;
    SprintOverweightLimits: Ixyz;
    WalkSpeedOverweightLimits: Ixyz;
    CrouchConsumption: Ixyz;
    WalkConsumption: Ixyz;
    StandupConsumption: Ixyz;
    TransitionSpeed: Ixyz;
    SprintAccelerationLowerLimit: number;
    SprintSpeedLowerLimit: number;
    SprintSensitivityLowerLimit: number;
    AimConsumptionByPose: Ixyz;
    RestorationMultiplierByPose: Ixyz;
    OverweightConsumptionByPose: Ixyz;
    AimingSpeedMultiplier: number;
    WalkVisualEffectMultiplier: number;
    WeaponFastSwitchConsumption: number;
    HandsCapacity: number;
    HandsRestoration: number;
    ProneConsumption: number;
    BaseHoldBreathConsumption: number;
    SoundRadius: Ixyz;
    ExhaustedMeleeSpeed: number;
    FatigueRestorationRate: number;
    FatigueAmountToCreateEffect: number;
    ExhaustedMeleeDamageMultiplier: number;
    FallDamageMultiplier: number;
    SafeHeightOverweight: number;
    SitToStandConsumption: number;
    StaminaExhaustionCausesJiggle: boolean;
    StaminaExhaustionStartsBreathSound: boolean;
    StaminaExhaustionRocksCamera: boolean;
    HoldBreathStaminaMultiplier: Ixyz;
    PoseLevelIncreaseSpeed: Ixyz;
    PoseLevelDecreaseSpeed: Ixyz;
    PoseLevelConsumptionPerNotch: Ixyz;
}
export interface IStaminaRestoration {
    LowerLeftPoint: number;
    LowerRightPoint: number;
    LeftPlatoPoint: number;
    RightPlatoPoint: number;
    RightLimit: number;
    ZeroValue: number;
}
export interface IStaminaDrain {
    LowerLeftPoint: number;
    LowerRightPoint: number;
    LeftPlatoPoint: number;
    RightPlatoPoint: number;
    RightLimit: number;
    ZeroValue: number;
}
export interface IRequirementReferences {
    Alpinist: IAlpinist[];
}
export interface IAlpinist {
    Requirement: string;
    Id: string;
    Count: number;
    RequiredSlot: string;
    RequirementTip: string;
}
export interface IRestrictionsInRaid {
    TemplateId: string;
    Value: number;
}
export interface IFavoriteItemsSettings {
    WeaponStandMaxItemsCount: number;
    PlaceOfFameMaxItemsCount: number;
}
export interface IVaultingSettings {
    IsActive: boolean;
    VaultingInputTime: number;
    GridSettings: IVaultingGridSettings;
    MovesSettings: IVaultingMovesSettings;
}
export interface IVaultingGridSettings {
    GridSizeX: number;
    GridSizeY: number;
    GridSizeZ: number;
    SteppingLengthX: number;
    SteppingLengthY: number;
    SteppingLengthZ: number;
    GridOffsetX: number;
    GridOffsetY: number;
    GridOffsetZ: number;
    OffsetFactor: number;
}
export interface IVaultingMovesSettings {
    VaultSettings: IVaultingSubMoveSettings;
    ClimbSettings: IVaultingSubMoveSettings;
}
export interface IVaultingSubMoveSettings {
    IsActive: boolean;
    MaxWithoutHandHeight: number;
    SpeedRange: Ixyz;
    MoveRestrictions: IMoveRestrictions;
    AutoMoveRestrictions: IMoveRestrictions;
}
export interface IMoveRestrictions {
    IsActive: boolean;
    MinDistantToInteract: number;
    MinHeight: number;
    MaxHeight: number;
    MinLength: number;
    MaxLength: number;
}
export interface IBTRSettings {
    LocationsWithBTR: string[];
    BasePriceTaxi: number;
    AddPriceTaxi: number;
    CleanUpPrice: number;
    DeliveryPrice: number;
    ModDeliveryCost: number;
    BearPriceMod: number;
    UsecPriceMod: number;
    ScavPriceMod: number;
    CoefficientDiscountCharisma: number;
    DeliveryMinPrice: number;
    TaxiMinPrice: number;
    BotCoverMinPrice: number;
    MapsConfigs: Record<string, IBtrMapConfig>;
    DiameterWheel: number;
    HeightWheel: number;
    HeightWheelMaxPosLimit: number;
    HeightWheelMinPosLimit: number;
    SnapToSurfaceWheelsSpeed: number;
    CheckSurfaceForWheelsTimer: number;
    HeightWheelOffset: number;
}
export interface IBtrMapConfig {
    BtrSkin: string;
    CheckSurfaceForWheelsTimer: number;
    DiameterWheel: number;
    HeightWheel: number;
    HeightWheelMaxPosLimit: number;
    HeightWheelMinPosLimit: number;
    HeightWheelOffset: number;
    SnapToSurfaceWheelsSpeed: number;
    SuspensionDamperStiffness: number;
    SuspensionRestLength: number;
    SuspensionSpringStiffness: number;
    SuspensionTravel: number;
    SuspensionWheelRadius: number;
    mapID: string;
    pathsConfigurations: IPathConfig[];
}
export interface IPathConfig {
    active: boolean;
    id: string;
    enterPoint: string;
    exitPoint: string;
    pathPoints: string[];
    once: boolean;
    circle: boolean;
    circleCount: number;
}
export interface ISquadSettings {
    CountOfRequestsToOnePlayer: number;
    SecondsForExpiredRequest: number;
    SendRequestDelaySeconds: number;
}
export interface IInsurance {
    MaxStorageTimeInHour: number;
    CoefOfSendingMessageTime: number;
    CoefOfHavingMarkOfUnknown: number;
    EditionSendingMessageTime: Record<string, IMessageSendTImeMultipler>;
}
export interface IMessageSendTImeMultipler {
    multiplier: number;
}
export interface ISkillsSettings {
    SkillProgressRate: number;
    WeaponSkillProgressRate: number;
    WeaponSkillRecoilBonusPerLevel: number;
    HideoutManagement: IHideoutManagement;
    Crafting: ICrafting;
    Metabolism: IMetabolism;
    Immunity: Immunity;
    Endurance: IEndurance;
    Strength: IStrength;
    Vitality: IVitality;
    Health: IHealthSkillProgress;
    StressResistance: IStressResistance;
    Throwing: IThrowing;
    RecoilControl: IRecoilControl;
    Pistol: IWeaponSkills;
    Revolver: IWeaponSkills;
    SMG: any[];
    Assault: IWeaponSkills;
    Shotgun: IWeaponSkills;
    Sniper: IWeaponSkills;
    LMG: any[];
    HMG: any[];
    Launcher: any[];
    AttachedLauncher: any[];
    Melee: IMeleeSkill;
    DMR: IWeaponSkills;
    BearAssaultoperations: any[];
    BearAuthority: any[];
    BearAksystems: any[];
    BearHeavycaliber: any[];
    BearRawpower: any[];
    UsecArsystems: any[];
    UsecDeepweaponmodding_Settings: any[];
    UsecLongrangeoptics_Settings: any[];
    UsecNegotiations: any[];
    UsecTactics: any[];
    BotReload: any[];
    CovertMovement: ICovertMovement;
    FieldMedicine: any[];
    Search: ISearch;
    Sniping: any[];
    ProneMovement: any[];
    FirstAid: any[];
    LightVests: IArmorSkills;
    HeavyVests: IArmorSkills;
    WeaponModding: any[];
    AdvancedModding: any[];
    NightOps: any[];
    SilentOps: any[];
    Lockpicking: any[];
    WeaponTreatment: IWeaponTreatment;
    MagDrills: IMagDrills;
    Freetrading: any[];
    Auctions: any[];
    Cleanoperations: any[];
    Barter: any[];
    Shadowconnections: any[];
    Taskperformance: any[];
    Perception: IPerception;
    Intellect: Intellect;
    Attention: IAttention;
    Charisma: ICharisma;
    Memory: IMemory;
    Surgery: ISurgery;
    AimDrills: IAimDrills;
    BotSound: any[];
    TroubleShooting: ITroubleShooting;
}
export interface IMeleeSkill {
    BuffSettings: IBuffSettings;
}
export interface IArmorSkills {
    BuffMaxCount: number;
    BuffSettings: IBuffSettings;
    Counters: IArmorCounters;
    MoveSpeedPenaltyReductionHVestsReducePerLevel: number;
    RicochetChanceHVestsCurrentDurabilityThreshold: number;
    RicochetChanceHVestsEliteLevel: number;
    RicochetChanceHVestsMaxDurabilityThreshold: number;
    MeleeDamageLVestsReducePerLevel: number;
    MoveSpeedPenaltyReductionLVestsReducePerLevel: number;
    WearAmountRepairLVestsReducePerLevel: number;
    WearChanceRepairLVestsReduceEliteLevel: number;
}
export interface IArmorCounters {
    armorDurability: ISkillCounter;
}
export interface IHideoutManagement {
    SkillPointsPerAreaUpgrade: number;
    SkillPointsPerCraft: number;
    ConsumptionReductionPerLevel: number;
    SkillBoostPercent: number;
    SkillPointsRate: ISkillPointsRate;
    EliteSlots: IEliteSlots;
}
export interface ISkillPointsRate {
    Generator: ISkillPointRate;
    AirFilteringUnit: ISkillPointRate;
    WaterCollector: ISkillPointRate;
    SolarPower: ISkillPointRate;
}
export interface ISkillPointRate {
    ResourceSpent: number;
    PointsGained: number;
}
export interface IEliteSlots {
    Generator: IEliteSlot;
    AirFilteringUnit: IEliteSlot;
    WaterCollector: IEliteSlot;
    BitcoinFarm: IEliteSlot;
}
export interface IEliteSlot {
    Slots: number;
    Container: number;
}
export interface ICrafting {
    PointsPerCraftingCycle: number;
    CraftingCycleHours: number;
    PointsPerUniqueCraftCycle: number;
    UniqueCraftsPerCycle: number;
    CraftTimeReductionPerLevel: number;
    ProductionTimeReductionPerLevel: number;
    EliteExtraProductions: number;
    CraftingPointsToInteligence: number;
}
export interface IMetabolism {
    HydrationRecoveryRate: number;
    EnergyRecoveryRate: number;
    IncreasePositiveEffectDurationRate: number;
    DecreaseNegativeEffectDurationRate: number;
    DecreasePoisonDurationRate: number;
}
export interface Immunity {
    ImmunityMiscEffects: number;
    ImmunityPoisonBuff: number;
    ImmunityPainKiller: number;
    HealthNegativeEffect: number;
    StimulatorNegativeBuff: number;
}
export interface IEndurance {
    MovementAction: number;
    SprintAction: number;
    GainPerFatigueStack: number;
    DependentSkillRatios: IDependentSkillRatio[];
    QTELevelMultipliers: Record<string, Record<string, number>>;
}
export interface IStrength {
    DependentSkillRatios: IDependentSkillRatio[];
    SprintActionMin: number;
    SprintActionMax: number;
    MovementActionMin: number;
    MovementActionMax: number;
    PushUpMin: number;
    PushUpMax: number;
    QTELevelMultipliers: IQTELevelMultiplier[];
    FistfightAction: number;
    ThrowAction: number;
}
export interface IDependentSkillRatio {
    Ratio: number;
    SkillId: string;
}
export interface IQTELevelMultiplier {
    Level: number;
    Multiplier: number;
}
export interface IVitality {
    DamageTakenAction: number;
    HealthNegativeEffect: number;
}
export interface IHealthSkillProgress {
    SkillProgress: number;
}
export interface IStressResistance {
    HealthNegativeEffect: number;
    LowHPDuration: number;
}
export interface IThrowing {
    ThrowAction: number;
}
export interface IRecoilControl {
    RecoilAction: number;
    RecoilBonusPerLevel: number;
}
export interface IWeaponSkills {
    WeaponReloadAction: number;
    WeaponShotAction: number;
    WeaponFixAction: number;
    WeaponChamberAction: number;
}
export interface ICovertMovement {
    MovementAction: number;
}
export interface ISearch {
    SearchAction: number;
    FindAction: number;
}
export interface IWeaponTreatment {
    BuffMaxCount: number;
    BuffSettings: IBuffSettings;
    Counters: IWeaponTreatmentCounters;
    DurLossReducePerLevel: number;
    SkillPointsPerRepair: number;
    Filter: any[];
    WearAmountRepairGunsReducePerLevel: number;
    WearChanceRepairGunsReduceEliteLevel: number;
}
export interface IWeaponTreatmentCounters {
    firearmsDurability: ISkillCounter;
}
export interface IBuffSettings {
    CommonBuffChanceLevelBonus: number;
    CommonBuffMinChanceValue: number;
    CurrentDurabilityLossToRemoveBuff?: number;
    MaxDurabilityLossToRemoveBuff?: number;
    RareBuffChanceCoff: number;
    ReceivedDurabilityMaxPercent: number;
}
export interface IMagDrills {
    RaidLoadedAmmoAction: number;
    RaidUnloadedAmmoAction: number;
    MagazineCheckAction: number;
}
export interface IPerception {
    DependentSkillRatios: ISkillRatio[];
    OnlineAction: number;
    UniqueLoot: number;
}
export interface ISkillRatio {
    Ratio: number;
    SkillId: string;
}
export interface Intellect {
    Counters: IIntellectCounters;
    ExamineAction: number;
    SkillProgress: number;
    RepairAction: number;
    WearAmountReducePerLevel: number;
    WearChanceReduceEliteLevel: number;
    RepairPointsCostReduction: number;
}
export interface IIntellectCounters {
    armorDurability: ISkillCounter;
    firearmsDurability: ISkillCounter;
    meleeWeaponDurability: ISkillCounter;
}
export interface ISkillCounter {
    divisor: number;
    points: number;
}
export interface IAttention {
    DependentSkillRatios: ISkillRatio[];
    ExamineWithInstruction: number;
    FindActionFalse: number;
    FindActionTrue: number;
}
export interface ICharisma {
    BonusSettings: IBonusSettings;
    Counters: ICharismaSkillCounters;
    SkillProgressInt: number;
    SkillProgressAtn: number;
    SkillProgressPer: number;
}
export interface ICharismaSkillCounters {
    insuranceCost: ISkillCounter;
    repairCost: ISkillCounter;
    repeatableQuestCompleteCount: ISkillCounter;
    restoredHealthCost: ISkillCounter;
    scavCaseCost: ISkillCounter;
}
export interface IBonusSettings {
    EliteBonusSettings: IEliteBonusSettings;
    LevelBonusSettings: ILevelBonusSettings;
}
export interface IEliteBonusSettings {
    FenceStandingLossDiscount: number;
    RepeatableQuestExtraCount: number;
    ScavCaseDiscount: number;
}
export interface ILevelBonusSettings {
    HealthRestoreDiscount: number;
    HealthRestoreTraderDiscount: number;
    InsuranceDiscount: number;
    InsuranceTraderDiscount: number;
    PaidExitDiscount: number;
    RepeatableQuestChangeDiscount: number;
}
export interface IMemory {
    AnySkillUp: number;
    SkillProgress: number;
}
export interface ISurgery {
    SurgeryAction: number;
    SkillProgress: number;
}
export interface IAimDrills {
    WeaponShotAction: number;
}
export interface ITroubleShooting {
    MalfRepairSpeedBonusPerLevel: number;
    SkillPointsPerMalfFix: number;
    EliteDurabilityChanceReduceMult: number;
    EliteAmmoChanceReduceMult: number;
    EliteMagChanceReduceMult: number;
}
export interface IAiming {
    ProceduralIntensityByPose: Ixyz;
    AimProceduralIntensity: number;
    HeavyWeight: number;
    LightWeight: number;
    MaxTimeHeavy: number;
    MinTimeHeavy: number;
    MaxTimeLight: number;
    MinTimeLight: number;
    RecoilScaling: number;
    RecoilDamping: number;
    CameraSnapGlobalMult: number;
    RecoilXIntensityByPose: Ixyz;
    RecoilYIntensityByPose: Ixyz;
    RecoilZIntensityByPose: Ixyz;
    RecoilCrank: boolean;
    RecoilHandDamping: number;
    RecoilConvergenceMult: number;
    RecoilVertBonus: number;
    RecoilBackBonus: number;
}
export interface IMalfunction {
    AmmoMalfChanceMult: number;
    MagazineMalfChanceMult: number;
    MalfRepairHardSlideMult: number;
    MalfRepairOneHandBrokenMult: number;
    MalfRepairTwoHandsBrokenMult: number;
    AllowMalfForBots: boolean;
    ShowGlowAttemptsCount: number;
    OutToIdleSpeedMultForPistol: number;
    IdleToOutSpeedMultOnMalf: number;
    TimeToQuickdrawPistol: number;
    DurRangeToIgnoreMalfs: Ixyz;
    DurFeedWt: number;
    DurMisfireWt: number;
    DurJamWt: number;
    DurSoftSlideWt: number;
    DurHardSlideMinWt: number;
    DurHardSlideMaxWt: number;
    AmmoMisfireWt: number;
    AmmoFeedWt: number;
    AmmoJamWt: number;
    OverheatFeedWt: number;
    OverheatJamWt: number;
    OverheatSoftSlideWt: number;
    OverheatHardSlideMinWt: number;
    OverheatHardSlideMaxWt: number;
}
export interface IOverheat {
    MinOverheat: number;
    MaxOverheat: number;
    OverheatProblemsStart: number;
    ModHeatFactor: number;
    ModCoolFactor: number;
    MinWearOnOverheat: number;
    MaxWearOnOverheat: number;
    MinWearOnMaxOverheat: number;
    MaxWearOnMaxOverheat: number;
    OverheatWearLimit: number;
    MaxCOIIncreaseMult: number;
    MinMalfChance: number;
    MaxMalfChance: number;
    DurReduceMinMult: number;
    DurReduceMaxMult: number;
    BarrelMoveRndDuration: number;
    BarrelMoveMaxMult: number;
    FireratePitchMult: number;
    FirerateReduceMinMult: number;
    FirerateReduceMaxMult: number;
    FirerateOverheatBorder: number;
    EnableSlideOnMaxOverheat: boolean;
    StartSlideOverheat: number;
    FixSlideOverheat: number;
    AutoshotMinOverheat: number;
    AutoshotChance: number;
    AutoshotPossibilityDuration: number;
    MaxOverheatCoolCoef: number;
}
export interface IFenceSettings {
    FenceId: string;
    Levels: Record<string, IFenceLevel>;
    paidExitStandingNumerator: number;
}
export interface IFenceLevel {
    ReachOnMarkOnUnknowns: boolean;
    SavageCooldownModifier: number;
    ScavCaseTimeModifier: number;
    PaidExitCostModifier: number;
    BotFollowChance: number;
    ScavEquipmentSpawnChanceModifier: number;
    PriceModifier: number;
    HostileBosses: boolean;
    HostileScavs: boolean;
    ScavAttackSupport: boolean;
    ExfiltrationPriceModifier: number;
    AvailableExits: number;
    BotApplySilenceChance: number;
    BotGetInCoverChance: number;
    BotHelpChance: number;
    BotSpreadoutChance: number;
    BotStopChance: number;
    PriceModTaxi: number;
    PriceModDelivery: number;
    PriceModCleanUp: number;
    ReactOnMarkOnUnknowns: boolean;
    ReactOnMarkOnUnknownsPVE: boolean;
    DeliveryGridSize: Ixyz;
    CanInteractWithBtr: boolean;
}
export interface IInertia {
    InertiaLimits: Ixyz;
    InertiaLimitsStep: number;
    ExitMovementStateSpeedThreshold: Ixyz;
    WalkInertia: Ixyz;
    FallThreshold: number;
    SpeedLimitAfterFallMin: Ixyz;
    SpeedLimitAfterFallMax: Ixyz;
    SpeedLimitDurationMin: Ixyz;
    SpeedLimitDurationMax: Ixyz;
    SpeedInertiaAfterJump: Ixyz;
    BaseJumpPenaltyDuration: number;
    DurationPower: number;
    BaseJumpPenalty: number;
    PenaltyPower: number;
    InertiaTiltCurveMin: Ixyz;
    InertiaTiltCurveMax: Ixyz;
    InertiaBackwardCoef: Ixyz;
    TiltInertiaMaxSpeed: Ixyz;
    TiltStartSideBackSpeed: Ixyz;
    TiltMaxSideBackSpeed: Ixyz;
    TiltAcceleration: Ixyz;
    AverageRotationFrameSpan: number;
    SprintSpeedInertiaCurveMin: Ixyz;
    SprintSpeedInertiaCurveMax: Ixyz;
    SprintBrakeInertia: Ixyz;
    SprintTransitionMotionPreservation: Ixyz;
    WeaponFlipSpeed: Ixyz;
    PreSprintAccelerationLimits: Ixyz;
    SprintAccelerationLimits: Ixyz;
    SideTime: Ixyz;
    DiagonalTime: Ixyz;
    MaxTimeWithoutInput: Ixyz;
    MinDirectionBlendTime: number;
    MoveTimeRange: Ixyz;
    ProneDirectionAccelerationRange: Ixyz;
    ProneSpeedAccelerationRange: Ixyz;
    MinMovementAccelerationRangeRight: Ixyz;
    MaxMovementAccelerationRangeRight: Ixyz;
}
export interface IBallistic {
    GlobalDamageDegradationCoefficient: number;
}
export interface IRepairSettings {
    ItemEnhancementSettings: IItemEnhancementSettings;
    MinimumLevelToApplyBuff: number;
    RepairStrategies: IRepairStrategies;
    armorClassDivisor: number;
    durabilityPointCostArmor: number;
    durabilityPointCostGuns: number;
}
export interface IItemEnhancementSettings {
    DamageReduction: IPriceModifier;
    MalfunctionProtections: IPriceModifier;
    WeaponSpread: IPriceModifier;
}
export interface IPriceModifier {
    PriceModifier: number;
}
export interface IRepairStrategies {
    Armor: IRepairStrategy;
    Firearms: IRepairStrategy;
}
export interface IRepairStrategy {
    BuffTypes: string[];
    Filter: string[];
}
export interface IBotPreset {
    UseThis: boolean;
    Role: string;
    BotDifficulty: string;
    VisibleAngle: number;
    VisibleDistance: number;
    ScatteringPerMeter: number;
    HearingSense: number;
    SCATTERING_DIST_MODIF: number;
    MAX_AIMING_UPGRADE_BY_TIME: number;
    FIRST_CONTACT_ADD_SEC: number;
    COEF_IF_MOVE: number;
}
export interface IAudioSettings {
    AudioGroupPresets: IAudioGroupPreset[];
}
export interface IAudioGroupPreset {
    AngleToAllowBinaural: number;
    DisabledBinauralByDistance: boolean;
    DistanceToAllowBinaural: number;
    GroupType: number;
    HeightToAllowBinaural: number;
    Name: string;
    OcclusionEnabled: boolean;
    OcclusionIntensity: number;
    OverallVolume: number;
}
export interface IEnvironmentSettings {
    SnowStepsVolumeMultiplier: number;
    SurfaceMultipliers: ISurfaceMultiplier[];
}
export interface ISurfaceMultiplier {
    SurfaceType: string;
    VolumeMult: number;
}
export interface IBotWeaponScattering {
    Name: string;
    PriorityScatter1meter: number;
    PriorityScatter10meter: number;
    PriorityScatter100meter: number;
}
export interface IPreset {
    _id: string;
    _type: string;
    _changeWeaponName: boolean;
    _name: string;
    _parent: string;
    _items: Item[];
    /** Default presets have this property */
    _encyclopedia?: string;
}
export interface IQuestSettings {
    GlobalRewardRepModifierDailyQuestPvE: number;
    GlobalRewardRepModifierQuestPvE: number;
}
