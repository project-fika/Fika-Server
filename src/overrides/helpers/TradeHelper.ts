import { DependencyContainer, inject, injectable } from "tsyringe";

import { HandbookHelper } from "@spt-aki/helpers/HandbookHelper";
import { InventoryHelper } from "@spt-aki/helpers/InventoryHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { TradeHelper } from "@spt-aki/helpers/TradeHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IProcessSellTradeRequestData } from "@spt-aki/models/eft/trade/IProcessSellTradeRequestData";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { Money } from "@spt-aki/models/enums/Money";
import { Traders } from "@spt-aki/models/enums/Traders";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { FenceService } from "@spt-aki/services/FenceService";
import { PaymentService } from "@spt-aki/services/PaymentService";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { Override } from "../../di/Override";

@injectable()
export class TradeHelperOverride extends Override {
    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("HttpResponseUtil") protected httpResponse: HttpResponseUtil,
        @inject("ItemHelper") protected itemHelper: ItemHelper,
        @inject("InventoryHelper") protected inventoryHelper: InventoryHelper,
        @inject("HandbookHelper") protected handbookHelper: HandbookHelper,
        @inject("FenceService") protected fenceService: FenceService,
        @inject("PaymentService") protected paymentService: PaymentService,
        @inject("ConfigServer") protected configServer: ConfigServer,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution("TradeHelper", (_t, result: TradeHelper) => {
            // Support fence holding player-sold items in assort
            result.sellItem = (profileWithItemsToSell: IPmcData, profileToReceiveMoney: IPmcData, sellRequest: IProcessSellTradeRequestData, sessionID: string, output: IItemEventRouterResponse) => {
                // Find item in inventory and remove it
                for (const itemToBeRemoved of sellRequest.items) {
                    // Strip out whitespace
                    const itemIdToFind = itemToBeRemoved.id.replace(/\s+/g, "");

                    // Find item in player inventory, or show error to player if not found
                    const matchingItemInInventory = profileWithItemsToSell.Inventory.items.find((x) => x._id === itemIdToFind);

                    if (!matchingItemInInventory) {
                        const errorMessage = `Unable to sell item ${itemToBeRemoved.id}, cannot be found in player inventory`;
                        this.logger.error(errorMessage);
                        this.httpResponse.appendErrorToOutput(output, errorMessage);
                        return;
                    }

                    this.logger.debug(`Selling: id: ${matchingItemInInventory._id} tpl: ${matchingItemInInventory._tpl}`);

                    // THIS IS THE ONLY CHANGE WE DO IN THIS METHOD!
                    if (sellRequest.tid === Traders.FENCE) {
                        this.addToFence(profileWithItemsToSell.Inventory.items, matchingItemInInventory._id);
                    }
                    // THIS IS THE ONLY CHANGE WE DO IN THIS METHOD!

                    // Also removes children
                    this.inventoryHelper.removeItem(profileWithItemsToSell, itemToBeRemoved.id, sessionID, output);
                }

                // Give player money for sold item(s)
                this.paymentService.giveProfileMoney(profileToReceiveMoney, sellRequest.price, sellRequest, output, sessionID);
            };
        });
    }

    private addToFence(itemCollection: Item[], itemId: string) {
        // yes, this is technically a protected class variable, but we can access it here since we don't care.
        const assort = this.fenceService.fenceAssort;

        // Copy the item and its children
        let items = structuredClone(this.itemHelper.findAndReturnChildrenAsItems(itemCollection, itemId));
        const root = items[0];

        const traderConfig = this.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const cost = this.handbookHelper.getTemplatePriceForItems(items) * traderConfig.fence.itemPriceMult;

        // Fix IDs
        items = this.itemHelper.reparentItemAndChildren(root, items);
        root.parentId = "hideout";

        //Add stack count to the root item
        root.upd ??= {};
        root.upd.StackObjectsCount ??= 1;

        // Clean up the items
        delete root.location;

        // Add the item to fence's assortment
        assort.items.push(...items);
        assort.barter_scheme[root._id] = [
            [
                {
                    count: cost,
                    _tpl: Money.ROUBLES,
                },
            ],
        ];
        assort.loyal_level_items[root._id] = 1;
    }
}
