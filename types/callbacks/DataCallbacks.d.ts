import { HideoutController } from "@spt-aki/controllers/HideoutController";
import { RagfairController } from "@spt-aki/controllers/RagfairController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGlobals } from "@spt-aki/models/eft/common/IGlobals";
import { ICustomizationItem } from "@spt-aki/models/eft/common/tables/ICustomizationItem";
import { IHandbookBase } from "@spt-aki/models/eft/common/tables/IHandbookBase";
import { IGetItemPricesResponse } from "@spt-aki/models/eft/game/IGetItemPricesResponse";
import { IHideoutArea } from "@spt-aki/models/eft/hideout/IHideoutArea";
import { IHideoutProduction } from "@spt-aki/models/eft/hideout/IHideoutProduction";
import { IHideoutScavCase } from "@spt-aki/models/eft/hideout/IHideoutScavCase";
import { IHideoutSettingsBase } from "@spt-aki/models/eft/hideout/IHideoutSettingsBase";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { ISettingsBase } from "@spt-aki/models/spt/server/ISettingsBase";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
/**
 * Handle client requests
 */
export declare class DataCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected databaseServer: DatabaseServer;
    protected ragfairController: RagfairController;
    protected hideoutController: HideoutController;
    constructor(httpResponse: HttpResponseUtil, databaseServer: DatabaseServer, ragfairController: RagfairController, hideoutController: HideoutController);
    /**
     * Handle client/settings
     * @returns ISettingsBase
     */
    getSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ISettingsBase>;
    /**
     * Handle client/globals
     * @returns IGlobals
     */
    getGlobals(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGlobals>;
    /**
     * Handle client/items
     * @returns string
     */
    getTemplateItems(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handle client/handbook/templates
     * @returns IHandbookBase
     */
    getTemplateHandbook(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHandbookBase>;
    /**
     * Handle client/customization
     * @returns Record<string, ICustomizationItem
     */
    getTemplateSuits(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<Record<string, ICustomizationItem>>;
    /**
     * Handle client/account/customization
     * @returns string[]
     */
    getTemplateCharacter(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<string[]>;
    /**
     * Handle client/hideout/settings
     * @returns IHideoutSettingsBase
     */
    getHideoutSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutSettingsBase>;
    getHideoutAreas(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutArea[]>;
    gethideoutProduction(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutProduction[]>;
    getHideoutScavcase(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutScavCase[]>;
    /**
     * Handle client/languages
     */
    getLocalesLanguages(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<Record<string, string>>;
    /**
     * Handle client/menu/locale
     */
    getLocalesMenu(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<string>;
    /**
     * Handle client/locale
     */
    getLocalesGlobal(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handle client/hideout/qte/list
     */
    getQteList(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handle client/items/prices/
     * Called when viewing a traders assorts
     * TODO -  fully implement this
     */
    getItemPrices(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGetItemPricesResponse>;
}
