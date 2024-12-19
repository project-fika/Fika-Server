import { inject, injectable } from "tsyringe";
import { WebSocket } from "ws";

import { InraidController } from "@spt/controllers/InraidController";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IRegisterPlayerRequestData } from "@spt/models/eft/inRaid/IRegisterPlayerRequestData";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";

import { EDedicatedStatus } from "../models/enums/EDedicatedStatus";
import { EFikaMatchEndSessionMessage } from "../models/enums/EFikaMatchEndSessionMessages";
import { EFikaNotifications } from "../models/enums/EFikaNotifications";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { IFikaRaidCreateRequestData } from "../models/fika/routes/raid/create/IFikaRaidCreateRequestData";
import { IFikaRaidCreateResponse } from "../models/fika/routes/raid/create/IFikaRaidCreateResponse";
import { IGetStatusDedicatedResponse } from "../models/fika/routes/raid/dedicated/IGetStatusDedicatedResponse";
import { IStartDedicatedRequest } from "../models/fika/routes/raid/dedicated/IStartDedicatedRequest";
import { IStartDedicatedResponse } from "../models/fika/routes/raid/dedicated/IStartDedicatedResponse";
import { IStatusDedicatedRequest } from "../models/fika/routes/raid/dedicated/IStatusDedicatedRequest";
import { IStatusDedicatedResponse } from "../models/fika/routes/raid/dedicated/IStatusDedicatedResponse";
import { IFikaRaidGethostResponse } from "../models/fika/routes/raid/gethost/IFikaRaidGethostResponse";
import { IFikaRaidSettingsResponse } from "../models/fika/routes/raid/getsettings/IFikaRaidSettingsResponse";
import { IFikaRaidJoinRequestData } from "../models/fika/routes/raid/join/IFikaRaidJoinRequestData";
import { IFikaRaidJoinResponse } from "../models/fika/routes/raid/join/IFikaRaidJoinResponse";
import { IFikaRaidLeaveRequestData } from "../models/fika/routes/raid/leave/IFikaRaidLeaveRequestData";
import { IStartRaidNotification } from "../models/fika/websocket/notifications/IStartRaidNotification";
import { FikaMatchService } from "../services/FikaMatchService";
import { FikaDedicatedRaidService } from "../services/dedicated/FikaDedicatedRaidService";
import { FikaDedicatedRaidWebSocket } from "../websockets/FikaDedicatedRaidWebSocket";
import { FikaNotificationWebSocket } from "../websockets/FikaNotificationWebSocket";

@injectable()
export class FikaRaidController {
    constructor(
        @inject("DatabaseService") protected databaseService: DatabaseService,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("FikaDedicatedRaidService") protected fikaDedicatedRaidService: FikaDedicatedRaidService,
        @inject("FikaDedicatedRaidWebSocket") protected fikaDedicatedRaidWebSocket: FikaDedicatedRaidWebSocket,
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("InraidController") protected inraidController: InraidController,
        @inject("FikaNotificationWebSocket") protected fikaNotificationWebSocket: FikaNotificationWebSocket,
    ) {
        // empty
    }

    /**
     * Handle /fika/raid/create
     * @param request
     */
    public handleRaidCreate(request: IFikaRaidCreateRequestData): IFikaRaidCreateResponse {
        const notification: IStartRaidNotification = {
            type: EFikaNotifications.StartedRaid,
            nickname: request.hostUsername,
            location: request.settings.location,
        };

        this.fikaNotificationWebSocket.broadcast(notification);

        return {
            success: this.fikaMatchService.createMatch(request),
        };
    }

    /**
     * Handle /fika/raid/join
     * @param request
     */
    public handleRaidJoin(request: IFikaRaidJoinRequestData): IFikaRaidJoinResponse {
        const match = this.fikaMatchService.getMatch(request.serverId);

        return {
            serverId: request.serverId,
            timestamp: match.timestamp,
            gameVersion: match.gameVersion,
            fikaVersion: match.fikaVersion,
            raidCode: match.raidCode,
        };
    }

    /**
     * Handle /fika/raid/leave
     * @param request
     */
    public handleRaidLeave(request: IFikaRaidLeaveRequestData): void {
        if (request.serverId === request.profileId) {
            this.fikaMatchService.endMatch(request.serverId, EFikaMatchEndSessionMessage.HOST_SHUTDOWN_MESSAGE);
            return;
        }

        this.fikaMatchService.removePlayerFromMatch(request.serverId, request.profileId);
    }

    /**
     * Handle /fika/raid/gethost
     * @param request
     */
    public handleRaidGetHost(request: IFikaRaidServerIdRequestData): IFikaRaidGethostResponse {
        const match = this.fikaMatchService.getMatch(request.serverId);
        if (!match) {
            return;
        }

        return {
            ips: match.ips,
            port: match.port,
            natPunch: match.natPunch,
            isDedicated: match.isDedicated,
        };
    }

    /**
     * Handle /fika/raid/getsettings
     * @param request
     */
    public handleRaidGetSettings(request: IFikaRaidServerIdRequestData): IFikaRaidSettingsResponse {
        const match = this.fikaMatchService.getMatch(request.serverId);
        if (!match) {
            return;
        }

        return {
            metabolismDisabled: match.raidConfig.metabolismDisabled,
            playersSpawnPlace: match.raidConfig.playersSpawnPlace,
            hourOfDay: match.raidConfig.timeAndWeatherSettings.hourOfDay,
            timeFlowType: match.raidConfig.timeAndWeatherSettings.timeFlowType,
        };
    }

    /** Handle /fika/raid/dedicated/start */
    handleRaidStartDedicated(sessionID: string, info: IStartDedicatedRequest): IStartDedicatedResponse {
        if (!this.fikaDedicatedRaidService.isDedicatedClientAvailable()) {
            return {
                matchId: null,
                error: "No dedicated clients available.",
            };
        }

        if (sessionID in this.fikaDedicatedRaidService.dedicatedClients) {
            return {
                matchId: null,
                error: "You are trying to connect to a dedicated client while having Fika.Dedicated installed. Please remove Fika.Dedicated from your client and try again.",
            };
        }

        let dedicatedClient: string | undefined = undefined;
        let dedicatedClientWs: WebSocket | undefined = undefined;

        for (const dedicatedSessionId in this.fikaDedicatedRaidService.dedicatedClients) {
            const dedicatedClientInfo = this.fikaDedicatedRaidService.dedicatedClients[dedicatedSessionId];

            if (dedicatedClientInfo.state != EDedicatedStatus.READY) {
                continue;
            }

            dedicatedClientWs = this.fikaDedicatedRaidWebSocket.clientWebSockets[dedicatedSessionId];

            if (!dedicatedClientWs || dedicatedClientWs.readyState == WebSocket.CLOSED) {
                continue;
            }

            dedicatedClient = dedicatedSessionId;
            break;
        }

        if (!dedicatedClient) {
            return {
                matchId: null,
                error: "No dedicated clients available at this time.",
            };
        }

        const pmcDedicatedClientProfile: IPmcData = this.profileHelper.getPmcProfile(dedicatedClient);
        const requesterProfile: IPmcData = this.profileHelper.getPmcProfile(sessionID);

        this.logger.debug(`Dedicated: ${pmcDedicatedClientProfile.Info.Nickname} ${pmcDedicatedClientProfile.Info.Level} - Requester: ${requesterProfile.Info.Nickname} ${requesterProfile.Info.Level}`);

        //Set level of the dedicated profile to the person that has requested the raid to be started.
        pmcDedicatedClientProfile.Info.Level = requesterProfile.Info.Level;
        pmcDedicatedClientProfile.Info.Experience = requesterProfile.Info.Experience;

        this.fikaDedicatedRaidService.requestedSessions[dedicatedClient] = sessionID;

        dedicatedClientWs.send(
            JSON.stringify({
                type: "fikaDedicatedStartRaid",
                ...info,
            }),
        );

        this.logger.info(`Sent WS fikaDedicatedStartRaid to ${dedicatedClient}`);

        return {
            // This really isn't required, I just want to make sure on the client
            matchId: dedicatedClient,
            error: null,
        };
    }

    /** Handle /fika/raid/dedicated/status */
    public handleRaidStatusDedicated(sessionId: string, info: IStatusDedicatedRequest): IStatusDedicatedResponse {
        // Temp fix because the enum gets deserialized as a string instead of an integer
        switch (info.status.toString()) {
            case "READY":
                info.status = EDedicatedStatus.READY;
                break;
            case "IN_RAID":
                info.status = EDedicatedStatus.IN_RAID;
                break;
        }

        if (info.status == EDedicatedStatus.READY && !this.fikaDedicatedRaidService.isDedicatedClientAvailable()) {
            if (this.fikaDedicatedRaidService.onDedicatedClientAvailable) {
                this.fikaDedicatedRaidService.onDedicatedClientAvailable();
            }
        }

        this.fikaDedicatedRaidService.dedicatedClients[sessionId] = {
            state: info.status,
            lastPing: Date.now(),
        };

        return {
            sessionId: info.sessionId,
            status: info.status,
        };
    }

    /** Handle /fika/raid/dedicated/getstatus */
    public handleRaidGetStatusDedicated(): IGetStatusDedicatedResponse {
        return {
            available: this.fikaDedicatedRaidService.isDedicatedClientAvailable(),
        };
    }

    /** Handle /fika/raid/dedicated/registerPlayer */
    public handleRaidRegisterPlayer(sessionId: string, info: IRegisterPlayerRequestData): void {
        this.inraidController.addPlayer(sessionId, info);
    }
}
