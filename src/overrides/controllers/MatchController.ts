import { DependencyContainer, inject, injectable } from "tsyringe";
import { MatchController } from "@spt/controllers/MatchController";
import { Override } from "../../di/Override";
import { FikaInsuranceService } from "../../services/FikaInsuranceService";
import { FikaMatchService } from "../../services/FikaMatchService";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";

@injectable()
export class MatchControllerOverride extends Override {
    constructor(
        @inject("FikaInsuranceService") protected fikaInsuranceService: FikaInsuranceService,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "MatchController",
            (_t, result: MatchController) => {
                result.endLocalRaid = (sessionId: string, request: IEndLocalRaidRequestData) => {
                    this.fikaInsuranceService.onEndLocalRaidRequest(sessionId, this.fikaInsuranceService.getMatchId(sessionId), request);
                };
            },
            { frequency: "Always" },
        );
    }
}
