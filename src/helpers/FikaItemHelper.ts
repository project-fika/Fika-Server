import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { injectable } from "tsyringe";


@injectable()
export class FikaItemHelper {
    constructor(
    ) {
    }

    public replaceIDs(originalItems: Item[], pmcData?: IPmcData, insuredItems?): Item[] {
        const result: Item[] = ItemHelper.prototype.replaceIDs.call(this, originalItems, pmcData, insuredItems);
        for (let i = 0; i < result.length; i++) {
            if (result[i].upd) {
                (<any>result[i].upd).PreviousID = originalItems[i]._id;
            }
            else {
                (<any>result[i].upd) = { PreviousID: originalItems[i]._id };
            }
        }

        return result;
    }
}
