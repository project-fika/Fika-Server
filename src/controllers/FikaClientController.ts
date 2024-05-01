import { inject, injectable } from "tsyringe";

import { IFikaConfigClient } from "../models/fika/config/IFikaConfigClient";

import { FikaConfig } from "../utils/FikaConfig";

@injectable()
export class FikaClientController {
    constructor(@inject("FikaConfig") protected fikaConfig: FikaConfig) {
        // empty
    }

    /**
     * Handle /fika/client/config
     */
    public handleClientConfig(): IFikaConfigClient {
        return this.fikaConfig.getConfig().client;
    }
}
