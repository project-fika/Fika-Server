import { inject, injectable } from "tsyringe";

import { InraidController } from "@spt/controllers/InraidController";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IRegisterPlayerRequestData } from "@spt/models/eft/inRaid/IRegisterPlayerRequestData";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";

import { FikaHeadlessHelper } from "../helpers/FikaHeadlessHelper";
import { EFikaMatchEndSessionMessage } from "../models/enums/EFikaMatchEndSessionMessages";
import { EFikaNotifications } from "../models/enums/EFikaNotifications";
import { IHeadlessAvailableClients } from "../models/fika/headless/IHeadlessAvailableClients";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { IFikaRaidCreateRequestData } from "../models/fika/routes/raid/create/IFikaRaidCreateRequestData";
import { IFikaRaidCreateResponse } from "../models/fika/routes/raid/create/IFikaRaidCreateResponse";
import { IFikaRaidGethostResponse } from "../models/fika/routes/raid/gethost/IFikaRaidGethostResponse";
import { IFikaRaidSettingsResponse } from "../models/fika/routes/raid/getsettings/IFikaRaidSettingsResponse";
import { IStartHeadlessRequest } from "../models/fika/routes/raid/headless/IStartHeadlessRequest";
import { IStartHeadlessResponse } from "../models/fika/routes/raid/headless/IStartHeadlessResponse";
import { IFikaRaidJoinRequestData } from "../models/fika/routes/raid/join/IFikaRaidJoinRequestData";
import { IFikaRaidJoinResponse } from "../models/fika/routes/raid/join/IFikaRaidJoinResponse";
import { IFikaRaidLeaveRequestData } from "../models/fika/routes/raid/leave/IFikaRaidLeaveRequestData";
import { IStartRaidNotification } from "../models/fika/websocket/notifications/IStartRaidNotification";
import { FikaMatchService } from "../services/FikaMatchService";
import { FikaHeadlessService } from "../services/headless/FikaHeadlessService";
import { FikaNotificationWebSocket } from "../websockets/FikaNotificationWebSocket";

@injectable()
export class FikaRaidController {
    constructor(
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("FikaHeadlessHelper") protected fikaHeadlessHelper: FikaHeadlessHelper,
        @inject("FikaHeadlessService") protected fikaHeadlessService: FikaHeadlessService,
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
        let hostUsername = request.hostUsername;

        if (this.fikaHeadlessHelper.isHeadlessClient(request.serverId)) {
            hostUsername = this.fikaHeadlessHelper.getHeadlessNickname(request.serverId);
        }

        const notification: IStartRaidNotification = {
            type: EFikaNotifications.StartedRaid,
            nickname: hostUsername,
            location: request.settings.location,
            isHeadlessRaid: this.fikaHeadlessHelper.isHeadlessClient(request.serverId),
            headlessRequesterName: this.fikaHeadlessHelper.getRequesterUsername(request.serverId) || "",
            raidTime: request.time
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
            crc32: match.crc32,
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
            isHeadless: match.isHeadless,
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

    /** Handle /fika/raid/headless/start */
    public async handleRaidStartHeadless(sessionID: string, info: IStartHeadlessRequest): Promise<IStartHeadlessResponse> {
        if (!this.fikaHeadlessHelper.isHeadlessClientAvailable(info.headlessSessionID)) {
            return {
                matchId: null,
                error: "This headless client is not available.",
            };
        }

        if (this.fikaHeadlessHelper.isHeadlessClient(sessionID)) {
            return {
                matchId: null,
                error: "You are trying to connect to a headless client while having Fika.Headless installed. Please remove Fika.Headless from your client and try again.",
            };
        }

        const headlessClientId = await this.fikaHeadlessService.startHeadlessRaid(info.headlessSessionID, sessionID, info);

        this.logger.info(`Sent WS fikaHeadlessStartRaid to ${headlessClientId}`);

        return {
            // This really isn't required, I just want to make sure on the client
            matchId: headlessClientId,
            error: null,
        };
    }

    /** Handle /fika/raid/registerPlayer */
    public handleRaidRegisterPlayer(sessionId: string, info: IRegisterPlayerRequestData): void {
        this.inraidController.addPlayer(sessionId, info);
    }
}
