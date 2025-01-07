import { IGlobals } from "@spt/models/eft/common/IGlobals";
import { IMatch } from "@spt/models/eft/common/tables/IMatch";
import { ITrader } from "@spt/models/eft/common/tables/ITrader";
import { IBots } from "@spt/models/spt/bots/IBots";
import { IHideout } from "@spt/models/spt/hideout/IHideout";
import { ILocaleBase } from "@spt/models/spt/server/ILocaleBase";
import { ILocations } from "@spt/models/spt/server/ILocations";
import { IServerBase } from "@spt/models/spt/server/IServerBase";
import { ISettingsBase } from "@spt/models/spt/server/ISettingsBase";
import { ITemplates } from "@spt/models/spt/templates/ITemplates";
export interface IDatabaseTables {
    bots?: IBots;
    hideout?: IHideout;
    locales?: ILocaleBase;
    locations?: ILocations;
    match?: IMatch;
    templates?: ITemplates;
    traders?: Record<string, ITrader>;
    globals?: IGlobals;
    server?: IServerBase;
    settings?: ISettingsBase;
}
