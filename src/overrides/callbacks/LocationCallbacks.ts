import { DependencyContainer, inject, injectable } from "tsyringe";

import { LocationCallbacks } from "@spt-aki/callbacks/LocationCallbacks";
import { LocationController } from "@spt-aki/controllers/LocationController";
import { IGetLocationRequestData } from "@spt-aki/models/eft/location/IGetLocationRequestData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { Override } from "../../di/Override";
import { FikaMatchService } from "../../services/FikaMatchService";

@injectable()
export class LocationCallbacksOverride extends Override {
    constructor(
        @inject("LocationController") protected locationController: LocationController,
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "LocationCallbacks",
            (_t, result: LocationCallbacks) => {
                result.getLocation = (_url: string, info: IGetLocationRequestData, sessionId: string) => {
                    const matchId = this.fikaMatchService.getMatchIdByProfile(sessionId);

                    if (matchId === undefined) {
                        // player isn't in a Fika match, generate new loot
                        return this.httpResponseUtil.getBody(this.locationController.get(sessionId, info));
                    }

                    // player is in a Fika match, use match location loot
                    const match = this.fikaMatchService.getMatch(matchId);
                    return this.httpResponseUtil.getBody(match.locationData);
                };
            },
            { frequency: "Always" },
        );
    }
}
