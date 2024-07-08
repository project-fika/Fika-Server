import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { injectable } from "tsyringe";
import { InsuredItem } from "@spt/models/eft/common/tables/IBotBase";

@injectable()
export class FikaItemHelper {
    constructor(
    ) {
    }

    public replaceIDs(originalItems: Item[], pmcData?: IPmcData, insuredItems?: InsuredItem[], fastPanel?: any): Item[] {
        const result: Item[] = ItemHelper.prototype.replaceIDs.call(this, originalItems, pmcData, insuredItems);
        if (insuredItems) {
            for (const insuredItem of insuredItems) {
                const insuredItemIndex = originalItems.findIndex(i => i._id == insuredItem.itemId);
                if (insuredItemIndex != -1) {
                    result[insuredItemIndex] = originalItems[insuredItemIndex];
                }
            }
        }

        return result;
    }
}
