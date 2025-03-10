import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPrestige } from "@spt/models/eft/common/tables/IPrestige";
import { IObtainPrestigeRequest } from "@spt/models/eft/prestige/IObtainPrestigeRequest";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import type { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
export declare class PrestigeController {
    protected saveServer: SaveServer;
    protected databaseService: DatabaseService;
    protected profileHelper: ProfileHelper;
    constructor(saveServer: SaveServer, databaseService: DatabaseService, profileHelper: ProfileHelper);
    /**
     * Handle /client/prestige/list
     */
    getPrestige(sessionID: string, info: IEmptyRequestData): IPrestige;
    /**
     * Handle /client/prestige/obtain
     */
    obtainPrestige(sessionId: string, request: IObtainPrestigeRequest[]): Promise<void>;
}
