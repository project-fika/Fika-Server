import { inject, injectable } from "tsyringe";

import { TimeUtil } from "@spt/utils/TimeUtil";
import { SaveServer } from "@spt/servers/SaveServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";

import { EFikaPlayerPresences } from "../models/enums/EFikaPlayerPresences";
import { IFikaPlayerPresence } from "../models/fika/presence/IFikaPlayerPresence";
import { IFikaRaidPresence } from "../models/fika/presence/IFikaRaidPresence";
import { IFikaSetPresence } from "../models/fika/presence/IFikaSetPresence";
import { EFikaSide } from "../models/enums/EFikaSide";
import { EFikaTime } from "../models/enums/EFikaTime";

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

    public generateSetPresence(activity: EFikaPlayerPresences, raidInformation?: IFikaRaidPresence): IFikaSetPresence {
        return {
            activity: activity,
            raidInformation: raidInformation,
        };
    }

    public generateRaidPresence(location: string, side: EFikaSide, time: EFikaTime): IFikaRaidPresence {
        return {
            location: location,
            side: side,
            time: time,
        };
    }

    public updatePlayerPresence(sessionID: string, newPresence: IFikaSetPresence): void {
        if (!this.onlinePlayers[sessionID]) {
            return;
        }

        const profile = this.saveServer.getProfile(sessionID);

        let data: IFikaPlayerPresence = {
            nickname: profile.characters.pmc.Info.Nickname,
            level: profile.characters.pmc.Info.Level,
            activity: newPresence.activity,
            activityStartedTimestamp: this.timeUtil.getTimestamp(),
            raidInformation: newPresence.raidInformation,
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
