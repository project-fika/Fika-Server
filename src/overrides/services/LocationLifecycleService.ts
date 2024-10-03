import { DependencyContainer, inject, injectable } from "tsyringe";

import { LocationController } from "@spt/controllers/LocationController";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { BotGenerationCacheService } from "@spt/services/BotGenerationCacheService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocationLifecycleService } from "@spt/services/LocationLifecycleService";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { Override } from "../../di/Override";
import { FikaMatchService } from "../../services/FikaMatchService";

@injectable()
export class LocationLifecycleServiceOverride extends Override {
    constructor(
        @inject("DatabaseService") protected databaseService: DatabaseService,
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("LocationController") protected locationController: LocationController,
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("LocationLifecycleService") protected locationLifecycleService: LocationLifecycleService,
        @inject("BotGenerationCacheService") protected botGenerationCacheService: BotGenerationCacheService,
        @inject("TimeUtil") protected timeUtil: TimeUtil
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
                    // Stops TS from throwing a trantrum :)
                    const lifecycleService = (this.locationLifecycleService as any);

                    if (matchId === undefined) {
                        // player isn't in a Fika match, generate new loot
                        locationLoot = lifecycleService.generateLocationAndLoot(request.location);
                    } else {
                        // player is in a Fika match, use match location loot
                        const match = this.fikaMatchService.getMatch(matchId);
                        locationLoot = match.locationData;
                    }

                    const playerProfile = this.profileHelper.getPmcProfile(sessionId);

                    const result: IStartLocalRaidResponseData = {
                        serverId: `${request.location}.${request.playerSide}.${this.timeUtil.getTimestamp()}`,
                        serverSettings: this.databaseService.getLocationServices(),
                        profile: { insuredItems: playerProfile.InsuredItems },
                        locationLoot: locationLoot,
                        transition: {
                            isLocationTransition: false,
                            transitionRaidId: "66f5750951530ca5ae09876d",
                            transitionCount: 0,
                            visitedLocations: [],
                        }
                    };

                    // Only has value when transitioning into map from previous one
                    if (request.transition) {
                        result.transition = request.transition;
                    }

                    if (typeof matchId === "undefined" || sessionId === matchId) {
                        // Apply changes from pmcConfig to bot hostility values
                        lifecycleService.adjustBotHostilitySettings(result.locationLoot);

                        lifecycleService.adjustExtracts(request.playerSide, request.location, result.locationLoot);

                        // Clear bot cache ready for a fresh raid
                        lifecycleService.botGenerationCacheService.clearStoredBots();
                        lifecycleService.botNameService.clearNameCache();
                    }

                    return result;
                };
            },
            { frequency: "Always" },
        );
    }
}
