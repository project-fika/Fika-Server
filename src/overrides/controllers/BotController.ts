import { injectable, inject, DependencyContainer } from "tsyringe";
import { FikaDialogueController } from "../../controllers/FikaDialogueController";
import { Override } from "../../di/Override";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { BotController } from "@spt/controllers/BotController";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IGenerateBotsRequestData } from "@spt/models/eft/bot/IGenerateBotsRequestData";
import { FikaDedicatedRaidService } from "../../services/dedicated/FikaDedicatedRaidService";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IPmcData } from "@spt/models/eft/common/IPmcData";

@injectable()
export class BotControllerOverride extends Override {
    constructor(
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("BotController") protected botController: BotController,
        @inject("FikaDedicatedRaidService") protected fikaDedicatedRaidService: FikaDedicatedRaidService,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "BotController",
            (_t, result: BotController) => {
                // Override the bot generate function to determine which profile to use whether we're
                // generating bots for a dedicated client or a normal host.
                result.generate = (sessionId: string, info: IGenerateBotsRequestData): Promise<IBotBase[]> => {

                    let pmcProfile: IPmcData;
                    const dedicatedSessions = this.fikaDedicatedRaidService.requestedSessions;

                    if(dedicatedSessions.hasOwnProperty(sessionId)) {
                        // Use the dedicated client requester's PMC profile
                        const dedicatedRequesterSessionId = dedicatedSessions[sessionId];
                        pmcProfile = this.profileHelper.getPmcProfile(dedicatedRequesterSessionId);
                    }
                    else {
                        // Use the host PMC profile
                        pmcProfile = this.profileHelper.getPmcProfile(sessionId);
                    }

                    // If there's more than 1 condition, this is the first time client has requested bots
                    // Client sends every bot type it will need in raid
                    // Use this opportunity to create and cache bots for later retreval
                    const isFirstGen = info.conditions.length > 1;
                    if (isFirstGen)
                    {
                        // Error because this is a protected method.
                        return this.botController.generateBotsFirstTime(info, pmcProfile, sessionId);
                    }
                    // Error because this is a protected method.
                    return this.botController.returnSingleBotFromCache(sessionId, info);
                };
            },
            { frequency: "Always" },
        );
    }
}
