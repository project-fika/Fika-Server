import { DependencyContainer, inject, injectable } from "tsyringe";
import { InraidController } from "@spt/controllers/InraidController";
import { Override } from "../../di/Override";
import { ISaveProgressRequestData } from "@spt/models/eft/inRaid/ISaveProgressRequestData";
import { FikaInsuranceService } from "../../services/FikaInsuranceService";
import { FikaMatchService } from "../../services/FikaMatchService";
import { ILogger } from "@spt/models/spt/utils/ILogger";

@injectable()
export class InraidControllerOverride extends Override {
    constructor(
        @inject("FikaInsuranceService") protected fikaInsuranceService: FikaInsuranceService,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "InraidController",
            (_t, result: InraidController) => {
                result.savePostRaidProgress = (offraidData: ISaveProgressRequestData, sessionID: string) => {
                    const match = this.fikaInsuranceService.getMatchId(sessionID);
                    if (match) {
                        this.fikaInsuranceService.onSavePostRaidProgress(sessionID, match, offraidData);
                    }
                    else {
                        this.logger.error("Failed to find match");
                    }
                };
            },
            { frequency: "Always" },
        );
    }
}
