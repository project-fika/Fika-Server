import { SaveServer } from "@spt-aki/servers/SaveServer";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class MatchLocationService {
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected locations: {};
    constructor(timeUtil: TimeUtil, saveServer: SaveServer);
    deleteGroup(info: any): void;
}
