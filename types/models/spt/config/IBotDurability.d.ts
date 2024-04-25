export interface IBotDurability {
    default: DefaultDurability;
    pmc: PmcDurability;
    boss: BotDurability;
    follower: BotDurability;
    assault: BotDurability;
    cursedassault: BotDurability;
    marksman: BotDurability;
    pmcbot: BotDurability;
    arenafighterevent: BotDurability;
    arenafighter: BotDurability;
    crazyassaultevent: BotDurability;
    exusec: BotDurability;
    gifter: BotDurability;
    sectantpriest: BotDurability;
    sectantwarrior: BotDurability;
}
/** Durability values to be used when a more specific bot type cant be found */
export interface DefaultDurability {
    armor: ArmorDurability;
    weapon: WeaponDurability;
}
export interface PmcDurability {
    armor: PmcDurabilityArmor;
    weapon: WeaponDurability;
}
export interface PmcDurabilityArmor {
    lowestMaxPercent: number;
    highestMaxPercent: number;
    maxDelta: number;
    minDelta: number;
}
export interface BotDurability {
    armor: ArmorDurability;
    weapon: WeaponDurability;
}
export interface ArmorDurability {
    maxDelta: number;
    minDelta: number;
    minLimitPercent: number;
}
export interface WeaponDurability {
    lowestMax: number;
    highestMax: number;
    maxDelta: number;
    minDelta: number;
    minLimitPercent: number;
}
