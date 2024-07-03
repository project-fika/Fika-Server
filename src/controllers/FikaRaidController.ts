import { inject, injectable } from "tsyringe";

import { FikaMatchEndSessionMessage } from "../models/enums/FikaMatchEndSessionMessages";
import { IFikaRaidServerIdRequestData } from "../models/fika/routes/raid/IFikaRaidServerIdRequestData";
import { IFikaRaidCreateRequestData } from "../models/fika/routes/raid/create/IFikaRaidCreateRequestData";
import { IFikaRaidCreateResponse } from "../models/fika/routes/raid/create/IFikaRaidCreateResponse";
import { IFikaRaidGethostResponse } from "../models/fika/routes/raid/gethost/IFikaRaidGethostResponse";
import { IFikaRaidSettingsResponse } from "../models/fika/routes/raid/getsettings/IFikaRaidSettingsResponse";
import { IFikaRaidJoinRequestData } from "../models/fika/routes/raid/join/IFikaRaidJoinRequestData";
import { IFikaRaidJoinResponse } from "../models/fika/routes/raid/join/IFikaRaidJoinResponse";
import { IFikaRaidLeaveRequestData } from "../models/fika/routes/raid/leave/IFikaRaidLeaveRequestData";
import { IFikaRaidSpawnpointResponse } from "../models/fika/routes/raid/spawnpoint/IFikaRaidSpawnpointResponse";
import { FikaMatchService } from "../services/FikaMatchService";
import { FikaGroupService } from "../services/FikaGroupService";
import { IFikaGroupRaidResponse } from "../models/fika/routes/raid/group/IFikaGroupRaidResponse";

@injectable()
export class FikaRaidController {
    constructor(
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("FikaGroupService") protected fikaGroupService: FikaGroupService
    ) {
        // empty
    }

    /**
     * Handle /fika/raid/create
     * @param request
     */
    public handleRaidCreate(request: IFikaRaidCreateRequestData): IFikaRaidCreateResponse {
        return {
            success: this.fikaMatchService.createMatch(request),
        };
    }

    /**
     * Handle /fika/raid/join
     * @param request
     */
    public handleRaidJoin(request: IFikaRaidJoinRequestData): IFikaRaidJoinResponse {
        const groupId = this.fikaGroupService.getGroupIdByMember(request.profileId);

        this.fikaMatchService.addPlayerToMatch(request.serverId, request.profileId, { groupId, isDead: false, side: request.side });

        const match = this.fikaMatchService.getMatch(request.serverId);

        return {
            serverId: request.serverId,
            timestamp: match.timestamp,
            expectedNumberOfPlayers: match.expectedNumberOfPlayers,
            gameVersion: match.gameVersion,
            fikaVersion: match.fikaVersion,
            raidCode: match.raidCode
        };
    }

    /**
     * Handle /fika/raid/leave
     * @param request
     */
    public handleRaidLeave(request: IFikaRaidLeaveRequestData): void {
        if (request.serverId === request.profileId) {
            this.fikaMatchService.endMatch(request.serverId, FikaMatchEndSessionMessage.HOST_SHUTDOWN_MESSAGE);
            return;
        }

        this.fikaMatchService.removePlayerFromMatch(request.serverId, request.profileId);
    }

    /**
     * Handle /fika/raid/gethost
     * @param request
     */
    public handleRaidGethost(request: IFikaRaidServerIdRequestData, sessionID: string): IFikaRaidGethostResponse {
        let match = this.fikaMatchService.getMatch(request.serverId);
        if (!match) {
            const groupId = this.fikaGroupService.getGroupIdByMember(sessionID);
            const leader = this.fikaGroupService.getGroupLeader(groupId);
            if (leader._id !== sessionID) {
                const matchId = this.fikaMatchService.getMatchIdByPlayer(leader._id);
                if (matchId) {
                    match = this.fikaMatchService.getMatch(matchId);
                }
            }

            if (!match) return;
        }

        return {
            ips: match.ips,
            port: match.port,
            natPunch: match.natPunch,
        };
    }

    /**
     * Handle /fika/raid/spawnpoint
     * @param request
     */
    public handleRaidSpawnpoint(request: IFikaRaidServerIdRequestData, sessionID: string): IFikaRaidSpawnpointResponse {
        const match = this.fikaMatchService.getMatch(request.serverId);
        if (!match) {
            return;
        }

        const groupId = this.fikaGroupService.getGroupIdByMember(sessionID);
        if (!groupId) {
            return;
        }

        const spawnpoint = match.spawnPoint[groupId];
        if (!spawnpoint) {
            return;
        }

        return {
            spawnpoint
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
            playersSpawnPlace: match.raidConfig.playersSpawnPlace
        };
    }

    /**
     * Handle /fika/raid/group
     * @param request
     * @returns
     */
    public handleGetGroupRaid(sessionID: string): IFikaGroupRaidResponse {
        const groupId = this.fikaGroupService.getGroupIdByMember(sessionID);
        const leader = this.fikaGroupService.getGroupLeader(groupId);

        if (!leader) {
            const match = this.fikaMatchService.getMatchIdByPlayer(sessionID);
            if (match) {
                return {
                    serverId: match
                }
            }
        } else {
            const match = this.fikaMatchService.getMatchIdByPlayer(leader._id);
            if (match) {
                return {
                    serverId: match
                }
            }
        }

        return { serverId: '' }
    }
}
