import path from "node:path";
import { DependencyContainer, inject, injectable } from "tsyringe";

import { ImageRouter } from "@spt-aki/routers/ImageRouter";

import { Override } from "../../di/Override";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class LauncherBackgroundOverride extends Override {
    constructor(
        @inject("ImageRouter") protected imageRouter: ImageRouter,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        super();
    }

    public execute(_container: DependencyContainer): void {
        this.imageRouter.addRoute("/files/launcher/bg", path.join(this.fikaConfig.getModPath(), "db/launcher_bg.png"));
    }
}
