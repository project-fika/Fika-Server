import { inject, injectable } from "tsyringe";

import { LocationController } from "@spt-aki/controllers/LocationController";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { SaveServer } from "@spt-aki/servers/SaveServer";

import { FikaMatchEndSessionMessage } from "../models/enums/FikaMatchEndSessionMessages";
import { FikaMatchStatus } from "../models/enums/FikaMatchStatus";
import { IFikaMatch } from "../models/fika/IFikaMatch";
import { IFikaPlayer } from "../models/fika/IFikaPlayer";
import { IFikaRaidCreateRequestData } from "../models/fika/routes/raid/create/IFikaRaidCreateRequestData";

@injectable()
export class FikaMatchService {
    protected matches: Map<string, IFikaMatch>;
    protected timeoutIntervals: Map<string, NodeJS.Timeout>;

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("LocationController") protected locationController: LocationController,
        @inject("SaveServer") protected saveServer: SaveServer,
    ) {
        this.matches = new Map();
        this.timeoutIntervals = new Map();
    }

    /**
     * Adds a timeout interval for the given match
     * @param matchId
     */
    private addTimeoutInterval(matchId: string): void {
        if (this.timeoutIntervals.has(matchId)) {
            this.removeTimeoutInterval(matchId);
        }

        this.timeoutIntervals.set(
            matchId,
            setInterval(() => {
                const match = this.getMatch(matchId);

                match.timeout++;

                // if it timed out 5 times or more, end the match
                if (match.timeout >= 5) {
                    this.endMatch(matchId, FikaMatchEndSessionMessage.PING_TIMEOUT_MESSAGE);
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

        const locationData = this.locationController.get(data.serverId, {
            crc: 0 /* unused */,
            locationId: data.settings.location,
            variantId: 0 /* unused */,
        });

        this.matches.set(data.serverId, {
            ip: null,
            port: null,
            hostUsername: data.hostUsername,
            timestamp: data.timestamp,
            expectedNumberOfPlayers: data.expectedNumberOfPlayers,
            raidConfig: data.settings,
            locationData: locationData,
            status: FikaMatchStatus.LOADING,
            spawnPoint: null,
            timeout: 0,
            players: new Map(),
            gameVersion: data.gameVersion,
            fikaVersion: data.fikaVersion,
            side: data.side,
            time: data.time,
        });

        this.addTimeoutInterval(data.serverId);

        this.addPlayerToMatch(data.serverId, data.serverId, { groupId: null, isDead: false });

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
    public endMatch(matchId: string, reason: FikaMatchEndSessionMessage): void {
        this.logger.info(`Coop session ${matchId} has ended: ${reason}`);

        this.deleteMatch(matchId);
    }

    /**
     * Updates the status of the given match
     * @param matchId
     * @param status
     */
    public setMatchStatus(matchId: string, status: FikaMatchStatus): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        this.matches.get(matchId).status = status;
    }

    /**
     * Sets the spawn point of the given match
     * @param matchId
     * @param spawnPoint
     */
    public setMatchSpawnPoint(matchId: string, spawnPoint: string): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        this.matches.get(matchId).spawnPoint = spawnPoint;
    }

    /**
     * Sets the ip and port for the given match
     * @param matchId
     * @param ip
     * @param port
     */
    public setMatchHost(matchId: string, ip: string, port: number): void {
        if (!this.matches.has(matchId)) {
            return;
        }

        const match = this.matches.get(matchId);

        match.ip = ip;
        match.port = port;
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

        this.matches.get(matchId).players.set(playerId, data);
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
        this.matches.get(matchId).players.delete(playerId);
    }
}
