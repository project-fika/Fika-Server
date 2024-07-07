import { IHideoutArea } from "@spt/models/eft/hideout/IHideoutArea";
import { IHideoutProduction } from "@spt/models/eft/hideout/IHideoutProduction";
import { IHideoutScavCase } from "@spt/models/eft/hideout/IHideoutScavCase";
import { IHideoutSettingsBase } from "@spt/models/eft/hideout/IHideoutSettingsBase";
import { IQteData } from "@spt/models/eft/hideout/IQteData";
export interface IHideout {
    areas: IHideoutArea[];
    production: IHideoutProduction[];
    scavcase: IHideoutScavCase[];
    settings: IHideoutSettingsBase;
    qte: IQteData[];
}
