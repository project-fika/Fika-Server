import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGlobals } from "@spt-aki/models/eft/common/IGlobals";
import { IHideoutArea } from "@spt-aki/models/eft/hideout/IHideoutArea";
import { IHideoutProduction } from "@spt-aki/models/eft/hideout/IHideoutProduction";
import { IHideoutScavCase } from "@spt-aki/models/eft/hideout/IHideoutScavCase";
import { IHideoutSettingsBase } from "@spt-aki/models/eft/hideout/IHideoutSettingsBase";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { ISettingsBase } from "@spt-aki/models/spt/server/ISettingsBase";
export interface IDataCallbacks {
    getSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ISettingsBase>;
    getGlobals(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGlobals>;
    getTemplateItems(url: string, info: IEmptyRequestData, sessionID: string): string;
    getTemplateHandbook(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    getTemplateSuits(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    getTemplateCharacter(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<string[]>;
    getHideoutSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutSettingsBase>;
    getHideoutAreas(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutArea[]>;
    gethideoutProduction(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutProduction[]>;
    getHideoutScavcase(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutScavCase[]>;
    getLocalesLanguages(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<Record<string, string>>;
    getLocalesMenu(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    getLocalesGlobal(url: string, info: IEmptyRequestData, sessionID: string): string;
}
