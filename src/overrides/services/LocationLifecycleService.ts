import { DependencyContainer, inject, injectable } from "tsyringe";

import { LocationController } from "@spt/controllers/LocationController";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { Override } from "../../di/Override";
import { FikaMatchService } from "../../services/FikaMatchService";
import { LocationLifecycleService } from "@spt/services/LocationLifecycleService";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { BotGenerationCacheService } from "@spt/services/BotGenerationCacheService";

@injectable()
export class LocationLifecycleServiceOverride extends Override {
    profileHelper: any;
    timeUtil: any;
    databaseService: any;
    constructor(
        @inject("LocationController") protected locationController: LocationController,
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("LocationLifecycleService") protected locationLifecycleService: LocationLifecycleService,
        @inject("BotGenerationCacheService") protected botGenerationCacheService: BotGenerationCacheService,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "LocationLifecycleService",
            (_t, result: LocationLifecycleService) => {
                result.startLocalRaid = (sessionId: string, request: IStartLocalRaidRequestData): IStartLocalRaidResponseData => {
                    let locationLoot: ILocationBase;
                    const matchId = this.fikaMatchService.getMatchIdByProfile(sessionId);

                    if (matchId === undefined) {
                        // player isn't in a Fika match, generate new loot
                        locationLoot = this.locationLifecycleService.generateLocationAndLoot(request.location);
                    } else {
                        // player is in a Fika match, use match location loot
                        const match = this.fikaMatchService.getMatch(matchId);
                        locationLoot = match.locationData;
                    }

                    const playerProfile = this.profileHelper.getPmcProfile(sessionId);

                    const result: IStartLocalRaidResponseData = {
                        serverId: `${request.location}.${request.playerSide}.${this.timeUtil.getTimestamp()}`, // TODO - does this need to be more verbose - investigate client?
                        serverSettings: this.databaseService.getLocationServices(), // TODO - is this per map or global?
                        profile: { insuredItems: playerProfile.InsuredItems },

                        // --- ONLY PART THAT IS MODIFIED
                        locationLoot: locationLoot,
                        // ---
                    };

                    // Clear bot cache ready for a fresh raid
                    this.botGenerationCacheService.clearStoredBots();

                    return result;
                };
            },
            { frequency: "Always" },
        );
    }
}
