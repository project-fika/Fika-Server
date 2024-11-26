export interface IBotDurability {
    default: IDefaultDurability;
    pmc: IPmcDurability;
    boss: IBotDurability;
    follower: IBotDurability;
    assault: IBotDurability;
    cursedassault: IBotDurability;
    marksman: IBotDurability;
    pmcbot: IBotDurability;
    arenafighterevent: IBotDurability;
    arenafighter: IBotDurability;
    crazyassaultevent: IBotDurability;
    exusec: IBotDurability;
    gifter: IBotDurability;
    sectantpriest: IBotDurability;
    sectantwarrior: IBotDurability;
}
/** Durability values to be used when a more specific bot type cant be found */
export interface IDefaultDurability {
    armor: IArmorDurability;
    weapon: IWeaponDurability;
}
export interface IPmcDurability {
    armor: IPmcDurabilityArmor;
    weapon: IWeaponDurability;
}
export interface IPmcDurabilityArmor {
    lowestMaxPercent: number;
    highestMaxPercent: number;
    maxDelta: number;
    minDelta: number;
}
export interface IBotDurability {
    armor: IArmorDurability;
    weapon: IWeaponDurability;
}
export interface IArmorDurability {
    maxDelta: number;
    minDelta: number;
    minLimitPercent: number;
}
export interface IWeaponDurability {
    lowestMax: number;
    highestMax: number;
    maxDelta: number;
    minDelta: number;
    minLimitPercent: number;
}
