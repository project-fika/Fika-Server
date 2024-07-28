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
import { FikaMatchService } from "../../services/FikaMatchService";
import { SaveServer } from "@spt/servers/SaveServer";

@injectable()
export class BotControllerOverride extends Override {
    constructor(
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("BotController") protected botController: BotController,
        @inject("FikaDedicatedRaidService") protected fikaDedicatedRaidService: FikaDedicatedRaidService,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("SaveServer") protected saveServer: SaveServer,
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
                    const isDedicated = dedicatedSessions.hasOwnProperty(sessionId);

                    if (isDedicated) {
                        // Use the dedicated client requester's PMC profile
                        const dedicatedRequesterSessionId = dedicatedSessions[sessionId];
                        pmcProfile = this.profileHelper.getPmcProfile(dedicatedRequesterSessionId);
                    } else {
                        // Use the host PMC profile
                        pmcProfile = this.profileHelper.getPmcProfile(sessionId);
                    }

                    // Get the matchId and then match
                    const matchId = this.fikaMatchService.getMatchIdByProfile(sessionId);
                    let match = this.fikaMatchService.getMatch(matchId);

                    if(!match)
                    {
                        this.logger.warning("FIKA Match is null! Running default SPT bot generation");

                        return this.botController.generate(sessionId, info);
                    }

                    const players = match.players.keys();

                    // Loop through all the players and get their profiles
                    let level = 1;
                    for (const playerId of players) {
                        const player = this.saveServer.getProfile(playerId);
                        if (player.info.password === "fika-dedicated") 
                            continue;

                        if (player.characters.pmc.Info.Level > level)
                            level = player.characters.pmc.Info.Level;
                    }

                    const originalLevel = pmcProfile.Info.Level;
                    pmcProfile.Info.Level = level;

                    // If there's more than 1 condition, this is the first time client has requested bots
                    // Client sends every bot type it will need in raid
                    // Use this opportunity to create and cache bots for later retrieval
                    const isFirstGen = info.conditions.length > 1;
                    let botGenerationResult: Promise<IBotBase[]>;
                    if (isFirstGen) {
                        // Temporary cast to remove the error caused by protected method.
                        botGenerationResult = (this.botController as any).generateBotsFirstTime(info, pmcProfile, sessionId);
                    }
                    // Temporary cast to remove the error caused by protected method.
                    botGenerationResult = (this.botController as any).returnSingleBotFromCache(sessionId, info);

                    // Set back the original level
                    //pmcProfile.Info.Level = originalLevel;
                    pmcProfile.Info.Level = originalLevel;
                    return botGenerationResult;
                };
            },
            { frequency: "Always" },
        );
    }
}
