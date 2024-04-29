export interface IBotLootCache {
    backpackLoot: Record<string, number>;
    pocketLoot: Record<string, number>;
    vestLoot: Record<string, number>;
    secureLoot: Record<string, number>;
    combinedPoolLoot: Record<string, number>;
    specialItems: Record<string, number>;
    healingItems: Record<string, number>;
    drugItems: Record<string, number>;
    foodItems: Record<string, number>;
    drinkItems: Record<string, number>;
    currencyItems: Record<string, number>;
    stimItems: Record<string, number>;
    grenadeItems: Record<string, number>;
}
export declare enum LootCacheType {
    SPECIAL = "Special",
    BACKPACK = "Backpack",
    POCKET = "Pocket",
    VEST = "Vest",
    SECURE = "SecuredContainer",
    COMBINED = "Combined",
    HEALING_ITEMS = "HealingItems",
    DRUG_ITEMS = "DrugItems",
    STIM_ITEMS = "StimItems",
    GRENADE_ITEMS = "GrenadeItems",
    FOOD_ITEMS = "FoodItems",
    DRINK_ITEMS = "DrinkItems",
    CURRENCY_ITEMS = "CurrencyItems"
}
