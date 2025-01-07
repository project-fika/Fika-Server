import { IProps, ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
export declare abstract class NewItemDetailsBase {
    /** Price of the item on flea market */
    fleaPriceRoubles: number;
    /** Price of the item in the handbook */
    handbookPriceRoubles: number;
    /** Handbook ParentId for the new item */
    handbookParentId: string;
    /**
     * A dictionary for locale settings, key = langauge (e.g. en,cn,es-mx,jp,fr)
     * If a language is not included, the first item in the array will be used in its place
     */
    locales: Record<string, LocaleDetails>;
}
export declare class NewItemFromCloneDetails extends NewItemDetailsBase {
    /** Id of the item to copy and use as a base */
    itemTplToClone: string;
    /** Item properties that should be applied over the top of the cloned base */
    overrideProperties: IProps;
    /** ParentId for the new item (item type) */
    parentId: string;
    /**
     * the id the new item should have, leave blank to have one generated for you
     * This is often known as the TplId, or TemplateId
     */
    newId: string;
}
export declare class NewItemDetails extends NewItemDetailsBase {
    newItem: ITemplateItem;
}
export declare class LocaleDetails {
    name: string;
    shortName: string;
    description: string;
}
export declare class CreateItemResult {
    constructor();
    success: boolean;
    itemId: string;
    errors: string[];
}
