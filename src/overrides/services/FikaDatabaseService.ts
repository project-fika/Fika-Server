import { DependencyContainer, inject, injectable } from "tsyringe";
import { Override } from "../../di/Override";

import { FikaConfig } from "../../utils/FikaConfig";

import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { IProfileTemplates } from "@spt/models/eft/common/tables/IProfileTemplate";
import { DatabaseServer } from "@spt/servers/DatabaseServer";

@injectable()
export class DatabaseServiceOverride extends Override {
    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("LocalisationService") protected localisationService: LocalisationService,
        @inject("FikaConfig") protected fikaConfig: FikaConfig
    ) {        
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "DatabaseService",
            (_t, result: DatabaseService) => {
                result.getProfiles = (): IProfileTemplates => {
                    const config = this.fikaConfig.getConfig().server;

                    if (!this.databaseServer.getTables().templates!.profiles) {
                        throw new Error(this.localisationService.getText("database-data_at_path_missing", "assets/database/templates/profiles.json"));
                    }

                    let templates = this.databaseServer.getTables().templates!.profiles!;

                    if (!config.showDevProfile) {
                        delete templates["SPT Developer"]
                    }

                    if (!config.showNonStandardProfile) {
                        for (const id of ["Tournament", "SPT Easy start", "SPT Zero to hero"]) {
                            delete templates[id]
                        }
                    }

                    return templates;
                };
            },
            { frequency: "Always" },
        );
    }
}
