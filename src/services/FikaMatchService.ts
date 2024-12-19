import { inject, injectable } from "tsyringe";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";
import { LocationLifecycleService } from "@spt/services/LocationLifecycleService";

import { EFikaMatchEndSessionMessage } from "../models/enums/EFikaMatchEndSessionMessages";
import { EFikaMatchStatus } from "../models/enums/EFikaMatchStatus";
import { EFikaPlayerPresences } from "../models/enums/EFikaPlayerPresences";
import { IFikaMatch } from "../models/fika/IFikaMatch";
import { IFikaPlayer } from "../models/fika/IFikaPlayer";
import { IFikaRaidCreateRequestData } from "../models/fika/routes/raid/create/IFikaRaidCreateRequestData";

import { FikaConfig } from "../utils/FikaConfig";
import { FikaInsuranceService } from "./FikaInsuranceService";
import { FikaPresenceService } from "./FikaPresenceService";
import { FikaDedicatedRaidService } from "./dedicated/FikaDedicatedRaidService";

@injectable()
export class FikaMatchService {
    public matches: Map<string, IFikaMatch>;
    protected timeoutIntervals: Map<string, NodeJS.Timeout>;

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("LocationLifecycleService") protected locationLifecycleService: LocationLifecycleService,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("FikaDedicatedRaidService") protected fikaDedicatedRaidService: FikaDedicatedRaidService,
        @inject("FikaInsuranceService") protected fikaInsuranceService: FikaInsuranceService,
        @inject("FikaPresenceService") protected fikaPresenceService: FikaPresenceService,
    ) {
        this.matches = new Map();
        this.timeoutIntervals = new Map();
    }

    /**
     * Adds a timeout interval for the given match
     * @param matchId
     */
    private addTimeoutInterval(matchId: string): void {
        const fikaConfig = this.fikaConfig.getConfig();

        if (this.timeoutIntervals.has(matchId)) {
            this.removeTimeoutInterval(matchId);
        }

        this.timeoutIntervals.set(
            matchId,
            setInterval(() => {
                const match = this.getMatch(matchId);

                match.timeout++;

                // if it timed out 'sessionTimeout' times or more, end the match
                if (match.timeout >= fikaConfig.server.sessionTimeout) {
                    this.endMatch(matchId, EFikaMatchEndSessionMessage.PING_TIMEOUT_MESSAGE);
                }
            }, 60 * 1000),
        );
    }

    /**
     * Removes the timeout interval for the given match
     * @param matchId
     * @returns
     */
    private removeTimeoutInterval(matchId: string): void {
        if (!this.timeoutIntervals.has(matchId)) {
            return;
        }

        clearInterval(this.timeoutIntervals.get(matchId));

        this.timeoutIntervals.delete(matchId);
    }

    /**
     * Returns the match with the given id, undefined if match does not exist
     * @param matchId
     * @returns
     */
    public getMatch(matchId: string): IFikaMatch {
        if (!this.matches.has(matchId)) {
            return;
        }

        return this.matches.get(matchId);
    }

    /**
     * Returns all matches
     * @returns
     */
    public getAllMatches(): Map<string, IFikaMatch> {
        return this.matches;
    }

    /**
     * Returns all match ids
     * @returns
     */
    public getAllMatchIds(): string[] {
        return Array.from(this.matches.keys());
    }

    /**
     * Returns the player with the given id in the given match, undefined if either match or player does not exist
     * @param matchId
     * @param playerId
     * @returns
     */
    public getPlayerInMatch(matchId: string, playerId: string): IFikaPlayer {
        if (!this.matches.has(matchId)) {
            return;
        }

        if (!this.matches.get(matchId).players.has(playerId)) {
            return;
        }

        return this.matches.get(matchId).players.get(playerId);
    }

    /**
     * Returns an array with all playerIds in the given match, undefined if match does not exist
     *
     * Note:
     * - host player is the one where playerId is equal to matchId
     * @param matchId
     * @returns
     */
    public getPlayersIdsByMatch(matchId: string): string[] {
        if (!this.matches.has(matchId)) {
            return;
        }

        return Array.from(this.matches.get(matchId).players.keys());
    }

    /**
     * Returns the match id that has a player with the given player id, undefined if the player isn't in a match
     *
     * @param playerId
     * @returns
     */
    public getMatchIdByPlayer(playerId: string): string {
        for (const [key, value] of this.matches.entries()) {
            if (value.players.has(playerId)) {
                return key;
            }
        }

        return undefined;
    }

    /**
     * Returns the match id that has a player with the given session id, undefined if the player isn't in a match
     *
     * Note:
     * - First tries to find pmc, then scav
     * @param sessionId
     * @returns
     */
    public getMatchIdByProfile(sessionId: string): string {
        const profile = this.saveServer.getProfile(sessionId);

        // check if pmc is in match
        let matchId = this.getMatchIdByPlayer(profile.characters.pmc._id);

        if (matchId === undefined) {
            // check if scav is in match
            matchId = this.getMatchIdByPlayer(profile.characters.scav._id);
        }

        return matchId;
    }

    /**
     * Creates a new coop match
     * @param data
     * @returns
     */
    public createMatch(data: IFikaRaidCreateRequestData): boolean {
        if (this.matches.has(data.serverId)) {
            this.deleteMatch(data.serverId);
        }

        // Stop TS from throwing a tantrum over protected methods
        const lifecycleService = this.locationLifecycleService as any;

        const locationData = lifecycleService.generateLocationAndLoot(data.settings.location);

        this.matches.set(data.serverId, {
            ips: null,
            port: null,
            hostUsername: data.hostUsername,
            timestamp: data.timestamp,
            raidConfig: data.settings,
            locationData: locationData,
            status: EFikaMatchStatus.LOADING,
            timeout: 0,
            players: new Map(),
            gameVersion: data.gameVersion,
            fikaVersion: data.fikaVersion,
            side: data.side,
            time: data.time,
            raidCode: data.raidCode,
            natPunch: false,
            isDedicated: false,
            raids: 0,
        });

        this.addTimeoutInterval(data.serverId);

        this.addPlayerToMatch(data.serverId, data.serverId, { groupId: null, isDead: false, isSpectator: data.isSpectator });

        return this.matches.has(data.serverId) && this.timeoutIntervals.has(data.serverId);
    }

    /**
     * Deletes a coop match and removes the timeout interval
     * @param matchId
     */
    public deleteMatch(matchId: string): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        this.matches.delete(matchId);

        this.removeTimeoutInterval(matchId);
    }

    /**
     * Ends the given match, logs a reason and removes the timeout interval
     * @param matchId
     * @param reason
     */
    public endMatch(matchId: string, reason: EFikaMatchEndSessionMessage): void {
        this.logger.info(`Coop session ${matchId} has ended: ${reason}`);

        if (this.fikaDedicatedRaidService.requestedSessions.hasOwnProperty(matchId)) {
            delete this.fikaDedicatedRaidService.requestedSessions[matchId];
        }

        this.fikaInsuranceService.onMatchEnd(matchId);
        this.deleteMatch(matchId);
    }

    /**
     * Updates the status of the given match
     * @param matchId
     * @param status
     */
    public setMatchStatus(matchId: string, status: EFikaMatchStatus): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        this.matches.get(matchId).status = status;

        if (status.toString() == "COMPLETE") {
            this.fikaDedicatedRaidService.handleRequestedSessions(matchId);
        }
    }

    /**
     * Sets the ip and port for the given match
     * @param matchId
     * @param ips
     * @param port
     */
    public setMatchHost(matchId: string, ips: string[], port: number, natPunch: boolean, isDedicated: boolean): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        const match = this.matches.get(matchId);

        match.ips = ips;
        match.port = port;
        match.natPunch = natPunch;
        match.isDedicated = isDedicated;
    }

    /**
     * Resets the timeout of the given match
     * @param matchId
     */
    public resetTimeout(matchId: string): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        this.matches.get(matchId).timeout = 0;
    }

    /**
     * Adds a player to a match
     * @param matchId
     * @param playerId
     * @param data
     */
    public addPlayerToMatch(matchId: string, playerId: string, data: IFikaPlayer): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        const match = this.matches.get(matchId);
        match.players.set(playerId, data);

        this.fikaInsuranceService.addPlayerToMatchId(matchId, playerId);

        this.fikaPresenceService.updatePlayerPresence(playerId, this.fikaPresenceService.generateSetPresence(
            EFikaPlayerPresences.IN_RAID,
            this.fikaPresenceService.generateRaidPresence(match.locationData.Id, match.side, match.time)));
    }

    /**
     * Sets a player to dead
     * @param matchId
     * @param playerId
     * @param data
     */
    public setPlayerDead(matchId: string, playerId: string): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        if (!this.matches.get(matchId).players.has(playerId)) {
            return;
        }

        this.matches.get(matchId).players.get(playerId).isDead = true;
    }

    /**
     * Sets the groupId for a player
     * @param matchId
     * @param playerId
     * @param groupId
     */
    public setPlayerGroup(matchId: string, playerId: string, groupId: string): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        if (!this.matches.get(matchId).players.has(playerId)) {
            return;
        }

        this.matches.get(matchId).players.get(playerId).groupId = groupId;
    }

    /**
     * Removes a player from a match
     * @param matchId
     * @param playerId
     */
    public removePlayerFromMatch(matchId: string, playerId: string): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        this.matches.get(matchId).players.delete(playerId);

        this.fikaPresenceService.updatePlayerPresence(playerId, this.fikaPresenceService.generateSetPresence(EFikaPlayerPresences.IN_MENU));
    }
}
