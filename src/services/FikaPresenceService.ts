import { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { inject, injectable } from "tsyringe";
import { FikaSide } from "../models/enums/FikaSide";

export interface IFikaPlayerPresence {
    sessionID: string;
    nickname: string;
    level: number;
    inRaid: boolean;
    raidInformation: IFikaRaidPresence;
}
export interface IFikaRaidPresence {
    location: string;
    side: FikaSide;
}

@injectable()
export class FikaPresenceService {
    private onlinePlayers: Record<string, IFikaPlayerPresence>;

    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        this.onlinePlayers = {};
    }

    public addPlayerPresence(sessionID: string): void {
        const profile = this.saveServer.getProfile(sessionID);

        if (!profile) {
            return;
        }

        let data = {} as IFikaPlayerPresence;
        data.sessionID = sessionID;
        data.nickname = profile.characters.pmc.Info.Nickname;
        data.level = profile.characters.pmc.Info.Level;
        data.inRaid = false;
        data.raidInformation = null;

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

    public getPlayerPresence(sessionID: string): IFikaPlayerPresence {
        const presence = this.onlinePlayers[sessionID];

        if (!presence) {
            throw new Error("This player does not exist in Fika presence!");
        }

        return presence;
    }

    public updatePlayerPresence(sessionID: string, raidInformation: IFikaRaidPresence = null): void {
        if (!this.onlinePlayers[sessionID]) {
            throw new Error("This player does not exist in Fika presence!");
        }

        const profile = this.saveServer.getProfile(sessionID);

        let data = {} as IFikaPlayerPresence;
        data.sessionID = sessionID;
        data.nickname = profile.characters.pmc.Info.Nickname;
        data.level = profile.characters.pmc.Info.Level;

        if (raidInformation) {
            data.inRaid = true;
        } else {
            data.inRaid = false;
        }

        data.raidInformation = raidInformation;

        this.onlinePlayers[sessionID] = data;
    }

    public removePlayerPresence(sessionID: string): void {
        if (!this.onlinePlayers[sessionID]) {
            return;
        }

        delete this.onlinePlayers[sessionID];
    }
}
