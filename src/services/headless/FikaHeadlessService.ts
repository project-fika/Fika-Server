import { inject, injectable } from "tsyringe";

import type { ILogger } from "@spt/models/spt/utils/ILogger";

import { SaveServer } from "@spt/servers/SaveServer";
import { SPTWebSocket } from "@spt/servers/ws/SPTWebsocket";
import { EFikaHeadlessWSMessageTypes } from "../../models/enums/EFikaHeadlessWSMessageTypes";
import { EHeadlessStatus } from "../../models/enums/EHeadlessStatus";
import { IHeadlessClientInfo } from "../../models/fika/headless/IHeadlessClientInfo";
import { IStartHeadlessRequest } from "../../models/fika/routes/raid/headless/IStartHeadlessRequest";
import { IHeadlessRequesterJoinRaid } from "../../models/fika/websocket/headless/IHeadlessRequesterJoinRaid";
import { IStartHeadlessRaid } from "../../models/fika/websocket/headless/IHeadlessStartRaid";
import { FikaConfig } from "../../utils/FikaConfig";
import { FikaHeadlessRequesterWebSocket } from "../../websockets/FikaHeadlessRequesterWebSocket";

@injectable()
export class FikaHeadlessService {
    private headlessClients: Map<string, IHeadlessClientInfo> = new Map();

    constructor(
        @inject("FikaHeadlessRequesterWebSocket") protected fikaHeadlessRequesterWebSocket: FikaHeadlessRequesterWebSocket,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {}

    public getHeadlessClients(): Map<string, IHeadlessClientInfo> {
        return this.headlessClients;
    }

    public addHeadlessClient(sessionID: string, webSocket: SPTWebSocket): void {
        this.headlessClients.set(sessionID, { webSocket: webSocket, state: EHeadlessStatus.READY });
    }

    public removeHeadlessClient(sessionID: string): void {
        this.headlessClients.delete(sessionID);
    }

    /** Begin setting up a raid for a headless client
     *
     * @returns returns the SessionID of the headless client that is starting this raid, returns null if no client could be found or there was an error.
     */
    public async startHeadlessRaid(headlessSessionID: string, requesterSessionID: string, info: IStartHeadlessRequest): Promise<string | null> {
        const headlessClient = this.headlessClients.get(headlessSessionID);

        if (!headlessClient || headlessClient?.state != EHeadlessStatus.READY) {
            return null;
        }

        headlessClient.state = EHeadlessStatus.IN_RAID;
        headlessClient.players = [];
        headlessClient.requesterSessionID = requesterSessionID;
        headlessClient.hasNotifiedRequester = false;

        const headlessClientWS = headlessClient.webSocket;

        if (!headlessClientWS) {
            return null;
        }

        if (headlessClientWS.readyState === WebSocket.CLOSED) {
            return null;
        }

        const startRequest: IStartHeadlessRaid = {
            type: EFikaHeadlessWSMessageTypes.HeadlessStartRaid,
            startRequest: info,
        };

        await headlessClientWS.sendAsync(JSON.stringify(startRequest));

        return headlessSessionID;
    }

    /** Sends a join message to the requester of a headless client */
    public async sendJoinMessageToRequester(headlessClientId: string): Promise<void> {
        const headlessClient = this.headlessClients.get(headlessClientId);

        if (!headlessClient || headlessClient?.state === EHeadlessStatus.READY) {
            return null;
        }

        const message: IHeadlessRequesterJoinRaid = {
            type: EFikaHeadlessWSMessageTypes.RequesterJoinMatch,
            matchId: headlessClientId,
        };

        await this.fikaHeadlessRequesterWebSocket.sendAsync(headlessClient.requesterSessionID, message);
        headlessClient.hasNotifiedRequester = true;
    }

    public addPlayerToHeadlessMatch(headlessClientId: string, sessionID: string): void {
        const headlessClient = this.headlessClients.get(headlessClientId);

        if (!headlessClient || headlessClient?.state != EHeadlessStatus.IN_RAID) {
            return;
        }

        if (headlessClientId === sessionID) {
            return;
        }

        headlessClient.players.push(sessionID);

        if (!this.fikaConfig.getConfig().headless.setLevelToAverageOfLobby) {
            // Doing this everytime is unecessary if we're not setting the average level so only set it once the original requester of the headless joins.
            if (headlessClient.requesterSessionID === sessionID) {
                this.setHeadlessLevel(headlessClientId);
            }
        } else {
            this.setHeadlessLevel(headlessClientId);
        }
    }

    private setHeadlessLevel(headlessClientId: string): void {
        const headlessClient = this.headlessClients.get(headlessClientId);

        if (!headlessClient || headlessClient?.state != EHeadlessStatus.IN_RAID) {
            return;
        }

        const headlessProfile = this.saveServer.getProfile(headlessClientId);

        // Set level of headless to that of the requester.
        if (!this.fikaConfig.getConfig().headless.setLevelToAverageOfLobby) {
            headlessProfile.characters.pmc.Info.Level = this.saveServer.getProfile(headlessClient.requesterSessionID).characters.pmc.Info.Level;
            return;
        }

        let baseHeadlessLevel = 0;
        let players = headlessClient.players.length;

        for (const sessionID of headlessClient.players) {
            baseHeadlessLevel += this.saveServer.getProfile(sessionID).characters.pmc.Info.Level;
        }

        baseHeadlessLevel = Math.round(baseHeadlessLevel / players);

        this.logger.debug(`[${headlessClientId}] Setting headless level to: ${baseHeadlessLevel} | Players: ${players}`);

        headlessProfile.characters.pmc.Info.Level = baseHeadlessLevel;
    }

    /** End the raid for the specified headless client, sets the state back to READY so that he can be requested to host again. */
    public endHeadlessRaid(headlessClientId: string): void {
        const headlessClient = this.headlessClients.get(headlessClientId);

        if (!headlessClient) {
            return;
        }

        headlessClient.state = EHeadlessStatus.READY;
        headlessClient.players = null;
        headlessClient.requesterSessionID = null;
        headlessClient.hasNotifiedRequester = null;
    }
}
