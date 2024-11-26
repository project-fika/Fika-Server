import { DependencyContainer, inject, injectable } from "tsyringe";

import { LauncherController } from "@spt/controllers/LauncherController";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IConnectResponse } from "@spt/models/eft/profile/IConnectResponse";

import { FikaConfig } from "../../utils/FikaConfig";
import { Override } from "../../di/Override";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";

@injectable()
export class LauncherControllerOverride extends Override {
    protected coreConfig: ICoreConfig;

    constructor(
        @inject("LauncherController") protected launcherController: LauncherController,
        @inject("HttpServerHelper") protected httpServerHelper: HttpServerHelper,
        @inject("DatabaseService") protected databaseService: DatabaseService,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        super();

        this.coreConfig = this.configServer.getConfig(ConfigTypes.CORE);
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "LauncherController",
            (_t, result: LauncherController) => {
                result.connect = (): IConnectResponse => {
                    let editions = this.databaseService.getProfiles();

                    if (!this.fikaConfig.getConfig().server.showDevProfile) {
                        // biome-ignore lint/performance/noDelete: Only ran once.
                        delete editions["SPT Developer"];
                    }

                    if (!this.fikaConfig.getConfig().server.showNonStandardProfile) {
                        for (const id of ["Tournament", "SPT Easy start", "SPT Zero to hero"]) {
                            delete editions[id];
                        }
                    }

                    // Stop TS from throwing a tantrum over protected methods
                    const launchController = this.launcherController as any;

                    return {
                        backendUrl: this.httpServerHelper.getBackendUrl(),
                        name: this.coreConfig.serverName,
                        editions: Object.keys(editions),
                        profileDescriptions: launchController.getProfileDescriptions(),
                    };
                };
            },
            { frequency: "Always" },
        );
    }
}
