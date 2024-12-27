import type { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import type { IBotCore } from "@spt/models/eft/common/tables/IBotCore";
import type { IBotType } from "@spt/models/eft/common/tables/IBotType";
export interface IBots {
    types: Record<string, IBotType>;
    base: IBotBase;
    core: IBotCore;
}
