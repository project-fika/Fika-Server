import type { IHideoutArea } from "@spt/models/eft/hideout/IHideoutArea";
import type { IHideoutCustomisation } from "@spt/models/eft/hideout/IHideoutCustomisation";
import type { IHideoutProductionData } from "@spt/models/eft/hideout/IHideoutProduction";
import type { IHideoutSettingsBase } from "@spt/models/eft/hideout/IHideoutSettingsBase";
import type { IQteData } from "@spt/models/eft/hideout/IQteData";
export interface IHideout {
    areas: IHideoutArea[];
    customisation: IHideoutCustomisation;
    production: IHideoutProductionData;
    settings: IHideoutSettingsBase;
    qte: IQteData[];
}
