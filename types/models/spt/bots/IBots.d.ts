import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { IBotCore } from "@spt/models/eft/common/tables/IBotCore";
import { IBotType } from "@spt/models/eft/common/tables/IBotType";
export interface IBots {
    types: Record<string, IBotType>;
    base: IBotBase;
    core: IBotCore;
}
