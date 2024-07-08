import { DependencyContainer, inject, injectable } from "tsyringe";

import { ItemHelper } from "@spt/helpers/ItemHelper";

import { Override } from "../../di/Override";
import { FikaItemHelper } from "../../helpers/FikaItemHelper";

@injectable()
export class ItemHelperOverride extends Override {
    constructor(
        @inject("FikaItemHelper") protected itemHelper: FikaItemHelper,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "ItemHelper",
            (_t, result: ItemHelper) => {
                result.replaceIDs = this.itemHelper.replaceIDs;
            },
            { frequency: "Always" },
        );
    }
}
