import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
export declare class PaymentHelper {
    protected configServer: ConfigServer;
    protected inventoryConfig: IInventoryConfig;
    constructor(configServer: ConfigServer);
    /**
     * Is the passed in tpl money (also checks custom currencies in inventoryConfig.customMoneyTpls)
     * @param {string} tpl
     * @returns void
     */
    isMoneyTpl(tpl: string): boolean;
    /**
     * Gets currency TPL from TAG
     * @param {string} currency
     * @returns string
     */
    getCurrency(currency: string): string;
}
