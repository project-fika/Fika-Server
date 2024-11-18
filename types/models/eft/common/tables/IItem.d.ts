export interface IItem {
    _id: string;
    _tpl: string;
    parentId?: string;
    slotId?: string;
    location?: IItemLocation | number;
    upd?: IUpd;
}
export interface IItemLocation {
    x: number;
    y: number;
    r: string | number;
    isSearched?: boolean;
    /** SPT property? */
    rotation?: string | boolean;
}
export interface IUpd {
    Buff?: IUpdBuff;
    OriginalStackObjectsCount?: number;
    Togglable?: IUpdTogglable;
    Map?: IUpdMap;
    Tag?: IUpdTag;
    /** SPT specific property, not made by BSG */
    sptPresetId?: string;
    FaceShield?: IUpdFaceShield;
    StackObjectsCount?: number;
    UnlimitedCount?: boolean;
    Repairable?: IUpdRepairable;
    RecodableComponent?: IUpdRecodableComponent;
    FireMode?: IUpdFireMode;
    SpawnedInSession?: boolean;
    Light?: IUpdLight;
    Key?: IUpdKey;
    Resource?: IUpdResource;
    Sight?: IUpdSight;
    MedKit?: IUpdMedKit;
    FoodDrink?: IUpdFoodDrink;
    Dogtag?: IUpdDogtag;
    BuyRestrictionMax?: number;
    BuyRestrictionCurrent?: number;
    Foldable?: IUpdFoldable;
    SideEffect?: IUpdSideEffect;
    RepairKit?: IUpdRepairKit;
    CultistAmulet?: IUpdCultistAmulet;
    PinLockState?: PinLockState;
}
export declare enum PinLockState {
    FREE = "Free",
    LOCKED = "Locked",
    PINNED = "Pinned"
}
export interface IUpdBuff {
    Rarity: string;
    BuffType: string;
    Value: number;
    ThresholdDurability?: number;
}
export interface IUpdTogglable {
    On: boolean;
}
export interface IUpdMap {
    Markers: IMapMarker[];
}
export interface IMapMarker {
    X: number;
    Y: number;
}
export interface IUpdTag {
    Color: number;
    Name: string;
}
export interface IUpdFaceShield {
    Hits: number;
}
export interface IUpdRepairable {
    Durability: number;
    MaxDurability: number;
}
export interface IUpdRecodableComponent {
    IsEncoded: boolean;
}
export interface IUpdMedKit {
    HpResource: number;
}
export interface IUpdSight {
    ScopesCurrentCalibPointIndexes: number[];
    ScopesSelectedModes: number[];
    SelectedScope: number;
}
export interface IUpdFoldable {
    Folded: boolean;
}
export interface IUpdFireMode {
    FireMode: string;
}
export interface IUpdFoodDrink {
    HpPercent: number;
}
export interface IUpdKey {
    NumberOfUsages: number;
}
export interface IUpdResource {
    Value: number;
    UnitsConsumed: number;
}
export interface IUpdLight {
    IsActive: boolean;
    SelectedMode: number;
}
export interface IUpdDogtag {
    AccountId: string;
    ProfileId: string;
    Nickname: string;
    Side: string;
    Level: number;
    Time: string;
    Status: string;
    KillerAccountId: string;
    KillerProfileId: string;
    KillerName: string;
    WeaponName: string;
}
export interface IUpdSideEffect {
    Value: number;
}
export interface IUpdRepairKit {
    Resource: number;
}
export interface IUpdCultistAmulet {
    NumberOfUsages: number;
}
