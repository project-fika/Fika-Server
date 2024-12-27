import type { IGlobals } from "@spt/models/eft/common/IGlobals";
import type { IMatch } from "@spt/models/eft/common/tables/IMatch";
import type { ITrader } from "@spt/models/eft/common/tables/ITrader";
import type { IBots } from "@spt/models/spt/bots/IBots";
import type { IHideout } from "@spt/models/spt/hideout/IHideout";
import type { ILocaleBase } from "@spt/models/spt/server/ILocaleBase";
import type { ILocations } from "@spt/models/spt/server/ILocations";
import type { IServerBase } from "@spt/models/spt/server/IServerBase";
import type { ISettingsBase } from "@spt/models/spt/server/ISettingsBase";
import type { ITemplates } from "@spt/models/spt/templates/ITemplates";
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
