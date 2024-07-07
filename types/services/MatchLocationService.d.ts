import { SaveServer } from "@spt/servers/SaveServer";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class MatchLocationService {
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected locations: {};
    constructor(timeUtil: TimeUtil, saveServer: SaveServer);
    deleteGroup(info: any): void;
}
