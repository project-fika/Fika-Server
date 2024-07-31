import path from "node:path";
import { DependencyContainer, inject, injectable } from "tsyringe";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { Overrider } from "./overrides/Overrider";
import { FikaServerTools } from "./utils/FikaServerTools";
import { FikaConfig } from "./utils/FikaConfig";
import { IFikaConfigNatPunchServer } from "./models/fika/config/IFikaConfigNatPunchServer";
import { IFikaConfigBackground } from "./models/fika/config/IFikaConfigBackground";
import { FikaDedicatedProfileService } from "./services/dedicated/FikaDedicatedProfileService";
import { IFikaConfigDedicated } from "./models/fika/config/IFikaConfigDedicated";
import { ImageRouter } from "@spt/routers/ImageRouter";

@injectable()
export class Fika {
    protected modPath: string;
    protected natPunchServerConfig: IFikaConfigNatPunchServer;
    protected dedicatedConfig: IFikaConfigDedicated;
    protected backgroundConfig: IFikaConfigBackground;

    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("Overrider") protected overrider: Overrider,
        @inject("FikaServerTools") protected fikaServerTools: FikaServerTools,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("FikaDedicatedProfileService") protected fikaDedicatedProfileService: FikaDedicatedProfileService,
        @inject("ImageRouter") protected imageRouter: ImageRouter,
    ) {
        this.modPath = fikaConfig.getModPath();
        this.natPunchServerConfig = fikaConfig.getConfig().natPunchServer;
        this.dedicatedConfig = fikaConfig.getConfig().dedicated;
        this.backgroundConfig = fikaConfig.getConfig().background;
    }

    public async preSptLoad(container: DependencyContainer): Promise<void> {
        await this.overrider.override(container);
    }

    public async postSptLoad(container: DependencyContainer): Promise<void> {
        if(this.natPunchServerConfig.enable) {
            this.fikaServerTools.startService("NatPunchServer");
        }

        if(this.dedicatedConfig.profiles.amount > 0) {
            this.fikaDedicatedProfileService.init();
        }

        if(this.backgroundConfig.enable) {
            const image = this.backgroundConfig.easteregg
                ? "assets/images/launcher/bg-senko.png"
                : "assets/images/launcher/bg.png";
            this.imageRouter.addRoute("/files/launcher/bg", path.join(this.modPath, image));
        }
    }
}
