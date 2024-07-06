import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITraderServiceModel } from "@spt/models/spt/services/ITraderServiceModel";
export interface ITrader {
    assort?: ITraderAssort;
    base: ITraderBase;
    dialogue?: Record<string, string[]>;
    questassort?: Record<string, Record<string, string>>;
    suits?: ISuit[];
    services?: ITraderServiceModel[];
}
export interface ITraderBase {
    refreshTraderRagfairOffers: boolean;
    _id: string;
    availableInRaid: boolean;
    avatar: string;
    balance_dol: number;
    balance_eur: number;
    balance_rub: number;
    buyer_up: boolean;
    currency: string;
    customization_seller: boolean;
    discount: number;
    discount_end: number;
    gridHeight: number;
    insurance: Insurance;
    items_buy: IItemBuyData;
    items_buy_prohibited: IItemBuyData;
    location: string;
    loyaltyLevels: LoyaltyLevel[];
    medic: boolean;
    name: string;
    nextResupply: number;
    nickname: string;
    repair: Repair;
    sell_category: string[];
    surname: string;
    unlockedByDefault: boolean;
}
export interface IItemBuyData {
    category: string[];
    id_list: string[];
}
export interface Insurance {
    availability: boolean;
    excluded_category: string[];
    max_return_hour: number;
    max_storage_time: number;
    min_payment: number;
    min_return_hour: number;
}
export interface LoyaltyLevel {
    buy_price_coef: number;
    exchange_price_coef: number;
    heal_price_coef: number;
    insurance_price_coef: number;
    minLevel: number;
    minSalesSum: number;
    minStanding: number;
    repair_price_coef: number;
}
export interface Repair {
    availability: boolean;
    currency: string;
    currency_coefficient: number;
    excluded_category: string[];
    /** Doesn't exist in client object */
    excluded_id_list: any[];
    quality: number;
}
export interface ITraderAssort {
    nextResupply: number;
    items: Item[];
    barter_scheme: Record<string, IBarterScheme[][]>;
    loyal_level_items: Record<string, number>;
}
export interface IBarterScheme {
    count: number;
    _tpl: string;
    onlyFunctional?: boolean;
    sptQuestLocked?: boolean;
}
export interface ISuit {
    _id: string;
    tid: string;
    suiteId: string;
    isActive: boolean;
    requirements: ISuitRequirements;
}
export interface ISuitRequirements {
    loyaltyLevel: number;
    profileLevel: number;
    standing: number;
    skillRequirements: string[];
    questRequirements: string[];
    itemRequirements: ItemRequirement[];
}
export interface ItemRequirement {
    count: number;
    _tpl: string;
    onlyFunctional: boolean;
}
