import { IItem, IUpd } from "@spt/models/eft/common/tables/IItem";
import { IPmcDataRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
import { BonusSkillType } from "@spt/models/enums/BonusSkillType";
import { BonusType } from "@spt/models/enums/BonusType";
import { HideoutAreas } from "@spt/models/enums/HideoutAreas";
import { MemberCategory } from "@spt/models/enums/MemberCategory";
import { QuestStatus } from "@spt/models/enums/QuestStatus";
export interface IBotBase {
    _id: string;
    aid: number;
    /** SPT property - use to store player id - TODO - move to AID ( account id as guid of choice) */
    sessionId: string;
    savage?: string;
    karmaValue: number;
    Info: IInfo;
    Customization: ICustomization;
    Health: IHealth;
    Inventory: IInventory;
    Skills: ISkills;
    Stats: IStats;
    Encyclopedia: Record<string, boolean>;
    TaskConditionCounters: Record<string, ITaskConditionCounter>;
    InsuredItems: IInsuredItem[];
    Hideout: IHideout;
    Quests: IQuestStatus[];
    TradersInfo: Record<string, ITraderInfo>;
    UnlockedInfo: IUnlockedInfo;
    RagfairInfo: IRagfairInfo;
    /** Achievement id and timestamp */
    Achievements: Record<string, number>;
    RepeatableQuests: IPmcDataRepeatableQuest[];
    Bonuses: IBonus[];
    Notes: INotes;
    CarExtractCounts: Record<string, number>;
    CoopExtractCounts: Record<string, number>;
    SurvivorClass: SurvivorClass;
    WishList: Record<string, number>;
    moneyTransferLimitData: IMoneyTransferLimits;
    /** SPT specific property used during bot generation in raid */
    sptIsPmc?: boolean;
}
export interface IMoneyTransferLimits {
    /** TODO: Implement */
    nextResetTime: number;
    remainingLimit: number;
    totalLimit: number;
    resetInterval: number;
}
export interface ITaskConditionCounter {
    id: string;
    type: string;
    value: number;
    /** Quest id */
    sourceId: string;
}
export interface IUnlockedInfo {
    unlockedProductionRecipe: string[];
}
export interface IInfo {
    EntryPoint: string;
    Nickname: string;
    LowerNickname: string;
    Side: string;
    SquadInviteRestriction: boolean;
    HasCoopExtension: boolean;
    HasPveGame: boolean;
    Voice: string;
    Level: number;
    Experience: number;
    RegistrationDate: number;
    GameVersion: string;
    AccountType: number;
    MemberCategory: MemberCategory;
    SelectedMemberCategory: MemberCategory;
    lockedMoveCommands: boolean;
    SavageLockTime: number;
    LastTimePlayedAsSavage: number;
    Settings: IBotInfoSettings;
    NicknameChangeDate: number;
    NeedWipeOptions: any[];
    lastCompletedWipe: ILastCompleted;
    Bans: IBan[];
    BannedState: boolean;
    BannedUntil: number;
    IsStreamerModeAvailable: boolean;
    lastCompletedEvent?: ILastCompleted;
    isMigratedSkills: boolean;
}
export interface IBotInfoSettings {
    Role: string;
    BotDifficulty: string;
    Experience: number;
    StandingForKill: number;
    AggressorBonus: number;
    UseSimpleAnimator: boolean;
}
export interface IBan {
    banType: BanType;
    dateTime: number;
}
export declare enum BanType {
    CHAT = 0,
    RAGFAIR = 1,
    VOIP = 2,
    TRADING = 3,
    ONLINE = 4,
    FRIENDS = 5,
    CHANGE_NICKNAME = 6
}
export interface ICustomization {
    Head: string;
    Body: string;
    Feet: string;
    Hands: string;
}
export interface IHealth {
    Hydration: ICurrentMax;
    Energy: ICurrentMax;
    Temperature: ICurrentMax;
    BodyParts: IBodyPartsHealth;
    UpdateTime: number;
    Immortal?: boolean;
}
export interface IBodyPartsHealth {
    Head: IBodyPartHealth;
    Chest: IBodyPartHealth;
    Stomach: IBodyPartHealth;
    LeftArm: IBodyPartHealth;
    RightArm: IBodyPartHealth;
    LeftLeg: IBodyPartHealth;
    RightLeg: IBodyPartHealth;
}
export interface IBodyPartHealth {
    Health: ICurrentMax;
    Effects?: Record<string, IBodyPartEffectProperties>;
}
export interface IBodyPartEffectProperties {
    ExtraData?: any;
    Time: number;
}
export interface ICurrentMax {
    Current: number;
    Maximum: number;
}
export interface IInventory {
    items: IItem[];
    equipment: string;
    stash: string;
    sortingTable: string;
    questRaidItems: string;
    questStashItems: string;
    /** Key is hideout area enum numeric as string e.g. "24", value is area _id  */
    hideoutAreaStashes: Record<string, string>;
    fastPanel: Record<string, string>;
    favoriteItems: string[];
}
export interface IBaseJsonSkills {
    Common: Record<string, Common>;
    Mastering: Record<string, IMastering>;
    Points: number;
}
export interface ISkills {
    Common: Common[];
    Mastering: IMastering[];
    Points: number;
}
export interface IBaseSkill {
    Id: string;
    Progress: number;
    max?: number;
    min?: number;
}
export interface Common extends IBaseSkill {
    PointsEarnedDuringSession?: number;
    LastAccess?: number;
}
export interface IMastering extends IBaseSkill {
}
export interface IStats {
    Eft?: IEftStats;
}
export interface IEftStats {
    CarriedQuestItems: string[];
    Victims: IVictim[];
    TotalSessionExperience: number;
    LastSessionDate: number;
    SessionCounters: ISessionCounters;
    OverallCounters: IOverallCounters;
    SessionExperienceMult?: number;
    ExperienceBonusMult?: number;
    Aggressor?: IAggressor;
    DroppedItems?: IDroppedItem[];
    FoundInRaidItems?: IFoundInRaidItem[];
    DamageHistory?: IDamageHistory;
    DeathCause?: IDeathCause;
    LastPlayerState?: ILastPlayerState;
    TotalInGameTime: number;
    SurvivorClass?: string;
    sptLastRaidFenceRepChange?: number;
}
export interface IDroppedItem {
    QuestId: string;
    ItemId: string;
    ZoneId: string;
}
export interface IFoundInRaidItem {
    QuestId: string;
    ItemId: string;
}
export interface IVictim {
    AccountId: string;
    ProfileId: string;
    Name: string;
    Side: string;
    BodyPart: string;
    Time: string;
    Distance: number;
    Level: number;
    Weapon: string;
    Role: string;
    Location: string;
}
export interface ISessionCounters {
    Items: ICounterKeyValue[];
}
export interface IOverallCounters {
    Items: ICounterKeyValue[];
}
export interface ICounterKeyValue {
    Key: string[];
    Value: number;
}
export interface IAggressor {
    AccountId: string;
    ProfileId: string;
    MainProfileNickname: string;
    Name: string;
    Side: string;
    BodyPart: string;
    HeadSegment: string;
    WeaponName: string;
    Category: string;
}
export interface IDamageHistory {
    LethalDamagePart: string;
    LethalDamage: ILethalDamage;
    BodyParts: IBodyPartsDamageHistory;
}
export interface ILethalDamage {
    Amount: number;
    Type: string;
    SourceId: string;
    OverDamageFrom: string;
    Blunt: boolean;
    ImpactsCount: number;
}
export interface IBodyPartsDamageHistory {
    Head: IDamageStats[];
    Chest: IDamageStats[];
    Stomach: IDamageStats[];
    LeftArm: IDamageStats[];
    RightArm: IDamageStats[];
    LeftLeg: IDamageStats[];
    RightLeg: IDamageStats[];
    Common: IDamageStats[];
}
export interface IDamageStats {
    Amount: number;
    Type: string;
    SourceId: string;
    OverDamageFrom: string;
    Blunt: boolean;
    ImpactsCount: number;
}
export interface IDeathCause {
    DamageType: string;
    Side: string;
    Role: string;
    WeaponId: string;
}
export interface ILastPlayerState {
    Info: ILastPlayerStateInfo;
    Customization: Record<string, string>;
    Equipment: any;
}
export interface ILastPlayerStateInfo {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: MemberCategory;
}
export interface IBackendCounter {
    id: string;
    qid?: string;
    value: number;
}
export interface IInsuredItem {
    /** Trader Id item was insured by */
    tid: string;
    itemId: string;
}
export interface IHideout {
    Production: Record<string, IProduction>;
    Areas: IBotHideoutArea[];
    Improvements: Record<string, IHideoutImprovement>;
    HideoutCounters: IHideoutCounters;
    Seed: number;
    MannequinPoses: string[];
    sptUpdateLastRunTimestamp: number;
}
export interface IHideoutCounters {
    fuelCounter: number;
    airFilterCounter: number;
    waterFilterCounter: number;
    craftingTimeCounter: number;
}
export interface IHideoutImprovement {
    completed: boolean;
    improveCompleteTimestamp: number;
}
export interface IProductive {
    Products: IProduct[];
    /** Seconds passed of production */
    Progress?: number;
    /** Is craft in some state of being worked on by client (crafting/ready to pick up) */
    inProgress?: boolean;
    StartTimestamp?: string;
    SkipTime?: number;
    /** Seconds needed to fully craft */
    ProductionTime?: number;
    GivenItemsInStart?: IItem[];
    Interrupted?: boolean;
    Code?: string;
    Decoded?: boolean;
    AvailableForFinish?: boolean;
    /** Used in hideout production.json */
    needFuelForAllProductionTime?: boolean;
    /** Used when sending data to client */
    NeedFuelForAllProductionTime?: boolean;
    sptIsScavCase?: boolean;
    /** Some crafts are always inProgress, but need to be reset, e.g. water collector */
    sptIsComplete?: boolean;
    /** Is the craft a Continuous, e.g bitcoins/water collector */
    sptIsContinuous?: boolean;
    /** Stores a list of tools used in this craft and whether they're FiR, to give back once the craft is done */
    sptRequiredTools?: IItem[];
    sptIsCultistCircle?: boolean;
}
export interface IProduction extends IProductive {
    RecipeId: string;
    SkipTime?: number;
    ProductionTime?: number;
}
export interface IScavCase extends IProductive {
    RecipeId: string;
}
export interface IProduct {
    _id: string;
    _tpl: string;
    upd?: IUpd;
}
export interface IBotHideoutArea {
    type: HideoutAreas;
    level: number;
    active: boolean;
    passiveBonusesEnabled: boolean;
    /** Must be integer */
    completeTime: number;
    constructing: boolean;
    slots: IHideoutSlot[];
    lastRecipe: string;
}
export interface IHideoutSlot {
    /** SPT specific value to keep track of what index this slot is (0,1,2,3 etc) */
    locationIndex: number;
    item?: IHideoutItem[];
}
export interface IHideoutItem {
    _id: string;
    _tpl: string;
    upd?: IUpd;
}
export interface ILastCompleted {
    $oid: string;
}
export interface INotes {
    Notes: INote[];
}
export declare enum SurvivorClass {
    UNKNOWN = 0,
    NEUTRALIZER = 1,
    MARAUDER = 2,
    PARAMEDIC = 3,
    SURVIVOR = 4
}
export interface IQuestStatus {
    qid: string;
    startTime: number;
    status: QuestStatus;
    statusTimers?: Record<string, number>;
    /** Property does not exist in live profile data, but is used by ProfileChanges.questsStatus when sent to client */
    completedConditions?: string[];
    availableAfter?: number;
}
export interface ITraderInfo {
    loyaltyLevel?: number;
    salesSum: number;
    standing: number;
    nextResupply: number;
    unlocked: boolean;
    disabled: boolean;
}
export interface IRagfairInfo {
    rating: number;
    isRatingGrowing: boolean;
    offers: IRagfairOffer[];
}
export interface IBonus {
    id?: string;
    type: BonusType;
    templateId?: string;
    passive?: boolean;
    production?: boolean;
    visible?: boolean;
    value?: number;
    icon?: string;
    filter?: string[];
    skillType?: BonusSkillType;
}
export interface INote {
    Time: number;
    Text: string;
}
