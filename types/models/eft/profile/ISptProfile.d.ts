import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { EquipmentBuildType } from "@spt/models/enums/EquipmentBuildType";
import { MemberCategory } from "@spt/models/enums/MemberCategory";
import { MessageType } from "@spt/models/enums/MessageType";
import { IProfileChangeEvent } from "@spt/models/spt/dialog/ISendMessageDetails";
export interface ISptProfile {
    info: Info;
    characters: Characters;
    /** Clothing purchases */
    suits: string[];
    userbuilds: IUserBuilds;
    dialogues: Record<string, Dialogue>;
    spt: Spt;
    vitality: Vitality;
    inraid: Inraid;
    insurance: Insurance[];
    /** Assort purchases made by player since last trader refresh */
    traderPurchases?: Record<string, Record<string, TraderPurchaseData>>;
    /** Achievements earned by player */
    achievements: Record<string, number>;
}
export declare class TraderPurchaseData {
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
export interface Characters {
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
    Items: Item[];
}
export interface IEquipmentBuild extends IUserBuild {
    Root: string;
    Items: Item[];
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
    Items: Item[];
    Root: string;
    BuildType: EquipmentBuildType;
    type: string;
}
export interface Dialogue {
    attachmentsNew: number;
    new: number;
    type: MessageType;
    Users?: IUserDialogInfo[];
    pinned: boolean;
    messages: Message[];
    _id: string;
}
export interface IUserDialogInfo {
    _id: string;
    aid: number;
    Info?: IUserDialogDetails;
}
export interface IUserDialogDetails {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: MemberCategory;
    SelectedMemberCategory: MemberCategory;
}
export interface DialogueInfo {
    attachmentsNew: number;
    new: number;
    _id: string;
    type: MessageType;
    pinned: boolean;
    Users?: IUserDialogInfo[];
    message: MessagePreview;
}
export interface Message {
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
    items?: MessageItems;
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
export interface MessagePreview {
    uid: string;
    type: MessageType;
    dt: number;
    templateId: string;
    text?: string;
    systemData?: ISystemData;
}
export interface MessageItems {
    stash?: string;
    data?: Item[];
}
export interface ISystemData {
    date?: string;
    time?: string;
    location?: string;
    buyerNickname?: string;
    soldItem?: string;
    itemCount?: number;
}
export interface IUpdatableChatMember {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: MemberCategory;
    Ignored: boolean;
    Banned: boolean;
}
export interface DateTime {
    date: string;
    time: string;
}
export interface Spt {
    /** What version of SPT was this profile made with */
    version: string;
    /** What mods has this profile loaded at any point in time */
    mods?: ModDetails[];
    /** What gifts has this profile received and how many */
    receivedGifts: ReceivedGift[];
    /** item TPLs blacklisted from being sold on flea for this profile */
    blacklistedItemTpls?: string[];
    /** key: daily type */
    freeRepeatableRefreshUsedCount: Record<string, number>;
}
export interface ModDetails {
    name: string;
    version: string;
    author: string;
    dateAdded: number;
    url: string;
}
export interface ReceivedGift {
    giftId: string;
    timestampLastAccepted: number;
    current: number;
}
export interface Vitality {
    health: Health;
    effects: Effects;
}
export interface Health {
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
export interface Effects {
    Head: Head;
    Chest: Chest;
    Stomach: Stomach;
    LeftArm: LeftArm;
    RightArm: RightArm;
    LeftLeg: LeftLeg;
    RightLeg: RightLeg;
}
export type Head = {};
export type Chest = {};
export type Stomach = {};
export interface LeftArm {
    Fracture?: number;
}
export interface RightArm {
    Fracture?: number;
}
export interface LeftLeg {
    Fracture?: number;
}
export interface RightLeg {
    Fracture?: number;
}
export interface Inraid {
    location: string;
    character: string;
}
export interface Insurance {
    scheduledTime: number;
    traderId: string;
    maxStorageTime: number;
    systemData: ISystemData;
    messageType: MessageType;
    messageTemplateId: string;
    items: Item[];
}
export interface MessageContentRagfair {
    offerId: string;
    count: number;
    handbookId: string;
}
