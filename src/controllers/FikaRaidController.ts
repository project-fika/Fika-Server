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
import { IFikaRaidVerifyInsuredItemsRequestData } from "../models/fika/routes/raid/IFikaRaidVerifyInsuredItemsRequestData";
import { SaveServer } from "@spt/servers/SaveServer";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";

@injectable()
export class FikaRaidController {
    constructor(
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("SaveServer") protected saveServer: SaveServer,
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
        this.fikaMatchService.addPlayerToMatch(request.serverId, request.profileId, { groupId: null, isDead: false });

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
    public handleRaidGethost(request: IFikaRaidServerIdRequestData): IFikaRaidGethostResponse {
        const match = this.fikaMatchService.getMatch(request.serverId);
        if (!match) {
            return;
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
    public handleRaidSpawnpoint(request: IFikaRaidServerIdRequestData): IFikaRaidSpawnpointResponse {
        const match = this.fikaMatchService.getMatch(request.serverId);
        if (!match) {
            return;
        }

        return {
            spawnpoint: match.spawnPoint,
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
     * Handle /fika/raid/verifyinsureditems
     * @param request
     */
    public handleRaidVerifyInsuredItems(request: IFikaRaidVerifyInsuredItemsRequestData): void {
        const profiles: Record<string, ISptProfile> = this.saveServer.getProfiles();
        if (!request.insuranceDatas) {
            return;
        }

        for (const profileId in request.insuranceDatas) {
            const profile = profiles[profileId];
            if (!profile) {
                continue;
            }

            const pickedUpItems = request.insuranceDatas[profileId];
            if (profile.characters?.pmc?.InsuredItems) {
                const newProfileInsuredItems = [];
                const profileInsuredItems = profile.characters.pmc.InsuredItems;
                for (const profileInsuredItem of profileInsuredItems) {
                    const foundItem = profile.characters.pmc.Inventory.items.find(i => i._id == profileInsuredItem.itemId);
                    if (!foundItem) {
                        continue;
                    }

                    if (!pickedUpItems.find(item => item.itemId == (foundItem.upd as any)?.PreviousID)) {
                        newProfileInsuredItems.push(profileInsuredItem);
                    }
                }

                profile.characters.pmc.InsuredItems = newProfileInsuredItems;
            }

            {
                const newInsurances = [];
                const insurances = [];
                for (const insurance of profile.insurance) {
                    const insuranceItems = [];
                    for (const profileInsuredItem of insurance.items) {
                        if (!pickedUpItems.find(item => item.itemId == (profileInsuredItem.upd as any)?.PreviousID)) {
                            insuranceItems.push(profileInsuredItem);
                        }
                    }

                    if (insurance.items.length > 0) {
                        insurance.items = insuranceItems;
                        insurances.push(insurance);
                    }
                }

                profile.insurance = newInsurances;
            }

        }

    }
}
