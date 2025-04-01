import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { ICustomisationStorage } from "@spt/models/eft/common/tables/ICustomisationStorage";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { EquipmentBuildType } from "@spt/models/enums/EquipmentBuildType";
import { MemberCategory } from "@spt/models/enums/MemberCategory";
import { MessageType } from "@spt/models/enums/MessageType";
import { IProfileChangeEvent } from "@spt/models/spt/dialog/ISendMessageDetails";
import { IObtainPrestigeRequest } from "../prestige/IObtainPrestigeRequest";
import { ISystemData } from "./ISystemData";
import { IUserDialogInfo } from "./IUserDialogInfo";
export interface ISptProfile {
    info: Info;
    characters: ICharacters;
    /**
     * @deprecated
     * Removed in 3.11 - clothing now stored in customisationUnlocks
     */
    suits?: string[];
    userbuilds: IUserBuilds;
    dialogues: Record<string, IDialogue>;
    spt: ISpt;
    vitality: IVitality;
    inraid: IInraid;
    insurance: IInsurance[];
    /** Assort purchases made by player since last trader refresh */
    traderPurchases?: Record<string, Record<string, ITraderPurchaseData>>;
    /** List of friend profile IDs */
    friends: string[];
    /** Stores profile-related customisation, e.g. clothing / hideout walls / floors */
    customisationUnlocks: ICustomisationStorage[];
}
export interface ITraderPurchaseData {
    count: number;
    purchaseTimestamp: number;
}
export interface Info {
    /** main profile id */
    id: string;
    scavId: string;
    aid: number;
    username: string;
    password: string;
    wipe: boolean;
    edition: string;
}
export interface ICharacters {
    pmc: IPmcData;
    scav: IPmcData;
}
/** used by profile.userbuilds */
export interface IUserBuilds {
    weaponBuilds: IWeaponBuild[];
    equipmentBuilds: IEquipmentBuild[];
    magazineBuilds: IMagazineBuild[];
}
export interface IUserBuild {
    Id: string;
    Name: string;
}
export interface IWeaponBuild extends IUserBuild {
    Root: string;
    Items: IItem[];
}
export interface IEquipmentBuild extends IUserBuild {
    Root: string;
    Items: IItem[];
    BuildType: EquipmentBuildType;
}
export interface IMagazineBuild extends IUserBuild {
    Caliber: string;
    TopCount: number;
    BottomCount: number;
    Items: IMagazineTemplateAmmoItem[];
}
export interface IMagazineTemplateAmmoItem {
    TemplateId: string;
    Count: number;
}
/** Used by defaultEquipmentPresets.json */
export interface IDefaultEquipmentPreset extends IUserBuild {
    Items: IItem[];
    Root: string;
    BuildType: EquipmentBuildType;
    type: string;
}
export interface IDialogue {
    attachmentsNew: number;
    new: number;
    type: MessageType;
    Users?: IUserDialogInfo[];
    pinned: boolean;
    messages: IMessage[];
    _id: string;
}
export interface IDialogueInfo {
    attachmentsNew: number;
    new: number;
    _id: string;
    type: MessageType;
    pinned: boolean;
    Users?: IUserDialogInfo[];
    message: IMessagePreview;
}
export interface IMessage {
    _id: string;
    uid: string;
    type: MessageType;
    dt: number;
    UtcDateTime?: number;
    Member?: IUpdatableChatMember;
    templateId?: string;
    text?: string;
    replyTo?: IReplyTo;
    hasRewards?: boolean;
    rewardCollected: boolean;
    items?: IMessageItems;
    maxStorageTime?: number;
    systemData?: ISystemData;
    profileChangeEvents?: IProfileChangeEvent[];
}
export interface IReplyTo {
    _id: string;
    uid: string;
    type: MessageType;
    dt: number;
    text?: string;
}
export interface IMessagePreview {
    uid: string;
    type: MessageType;
    dt: number;
    templateId: string;
    text?: string;
    systemData?: ISystemData;
}
export interface IMessageItems {
    stash?: string;
    data?: IItem[];
}
export interface IUpdatableChatMember {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: MemberCategory;
    Ignored: boolean;
    Banned: boolean;
}
export interface ISpt {
    /** What version of SPT was this profile made with */
    version: string;
    /** What mods has this profile loaded at any point in time */
    mods?: IModDetails[];
    /** What gifts has this profile received and how many */
    receivedGifts?: IReceivedGift[];
    /** item TPLs blacklisted from being sold on flea for this profile */
    blacklistedItemTpls?: string[];
    /** key: daily type */
    freeRepeatableRefreshUsedCount?: Record<string, number>;
    /** When was a profile migrated, value is timestamp */
    migrations?: Record<string, number>;
    /** Cultist circle rewards received that are one time use, key (md5) is a combination of sacrificed + reward items */
    cultistRewards?: Map<string, IAcceptedCultistReward>;
    pendingPrestige?: IPendingPrestige;
    /** Track the number of extra repeatable quests available */
    extraRepeatableQuests?: Record<string, number>;
}
export interface IPendingPrestige {
    prestigeLevel: number;
    items?: IObtainPrestigeRequest[];
}
export interface IAcceptedCultistReward {
    timestamp: number;
    sacrificeItems: string[];
    rewardItems: string[];
}
export interface IModDetails {
    name: string;
    version: string;
    author: string;
    dateAdded: number;
    url: string;
}
export interface IReceivedGift {
    giftId: string;
    timestampLastAccepted: number;
    current: number;
}
export interface IVitality {
    health: IHealth;
    effects: IEffects;
}
export interface IHealth {
    Hydration: number;
    Energy: number;
    Temperature: number;
    Head: number;
    Chest: number;
    Stomach: number;
    LeftArm: number;
    RightArm: number;
    LeftLeg: number;
    RightLeg: number;
}
export interface IEffects {
    Head: IHead;
    Chest: IChest;
    Stomach: IStomach;
    LeftArm: ILeftArm;
    RightArm: IRightArm;
    LeftLeg: ILeftLeg;
    RightLeg: IRightLeg;
}
export type IHead = {};
export type IChest = {};
export type IStomach = {};
export interface ILeftArm {
    Fracture?: number;
}
export interface IRightArm {
    Fracture?: number;
}
export interface ILeftLeg {
    Fracture?: number;
}
export interface IRightLeg {
    Fracture?: number;
}
export interface IInraid {
    location: string;
    character: string;
}
export interface IInsurance {
    scheduledTime: number;
    traderId: string;
    maxStorageTime: number;
    systemData: ISystemData;
    messageType: MessageType;
    messageTemplateId: string;
    items: IItem[];
}
