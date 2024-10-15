import { inject, injectable } from "tsyringe";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { TimeUtil } from "@spt/utils/TimeUtil";

import { EFikaPlayerPresences } from "../models/enums/EFikaPlayerPresences";
import { IFikaPlayerPresence } from "../models/fika/presence/IFikaPlayerPresence";
import { IFikaRaidPresence } from "../models/fika/presence/IFikaRaidPresence";
import { IFikaSetPresence } from "../models/fika/presence/IFikaSetPresence";

@injectable()
export class FikaPresenceService {
    private onlinePlayers: Record<string, IFikaPlayerPresence>;

    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("TimeUtil") protected timeUtil: TimeUtil,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        this.onlinePlayers = {};
    }

    public addPlayerPresence(sessionID: string): void {
        const profile = this.saveServer.getProfile(sessionID);

        if (!profile) {
            return;
        }

        let data: IFikaPlayerPresence = {
            nickname: profile.characters.pmc.Info.Nickname,
            level: profile.characters.pmc.Info.Level,
            activity: EFikaPlayerPresences.IN_MENU,
            activityStartedTimestamp: this.timeUtil.getTimestamp(),
            raidInformation: null,
        };

        this.logger.debug(`[Fika Presence] Adding player: ${data.nickname}`);

        this.onlinePlayers[sessionID] = data;
    }

    public getAllPlayersPresence(): IFikaPlayerPresence[] {
        let playerList: IFikaPlayerPresence[] = [];

        for (const sessionID in this.onlinePlayers) {
            let player = this.onlinePlayers[sessionID];

            playerList.push(player);
        }

        return playerList;
    }

    public updatePlayerPresence(sessionID: string, activity: EFikaPlayerPresences, raidInformation?: IFikaRaidPresence): void {
        if (!this.onlinePlayers[sessionID]) {
            return;
        }

        const profile = this.saveServer.getProfile(sessionID);

        let data: IFikaPlayerPresence = {
            nickname: profile.characters.pmc.Info.Nickname,
            level: profile.characters.pmc.Info.Level,
            activity: activity,
            activityStartedTimestamp: this.timeUtil.getTimestamp(),
            raidInformation: raidInformation
        };

        this.onlinePlayers[sessionID] = data;
    }

    public setPlayerPresence(sessionID: string, request: IFikaSetPresence): void {
        if (!this.onlinePlayers[sessionID]) {
            return;
        }

        console.log(JSON.stringify(request));

        const profile = this.saveServer.getProfile(sessionID);

        let data: IFikaPlayerPresence = {
            nickname: profile.characters.pmc.Info.Nickname,
            level: profile.characters.pmc.Info.Level,
            activity: request.activity,
            activityStartedTimestamp: this.timeUtil.getTimestamp(),
            raidInformation: request?.raidInformation
        };

        this.onlinePlayers[sessionID] = data;
    }

    public removePlayerPresence(sessionID: string): void {
        if (!this.onlinePlayers[sessionID]) {
            return;
        }

        delete this.onlinePlayers[sessionID];
    }
}
