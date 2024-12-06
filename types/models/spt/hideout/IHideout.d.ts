import { IHideoutArea } from "@spt/models/eft/hideout/IHideoutArea";
import { IHideoutProductionData } from "@spt/models/eft/hideout/IHideoutProduction";
import { IHideoutSettingsBase } from "@spt/models/eft/hideout/IHideoutSettingsBase";
import { IQteData } from "@spt/models/eft/hideout/IQteData";
export interface IHideout {
    areas: IHideoutArea[];
    production: IHideoutProductionData;
    settings: IHideoutSettingsBase;
    qte: IQteData[];
}
