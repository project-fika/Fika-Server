import { inject, injectable } from "tsyringe";

import { IFikaConfigClient } from "../models/fika/config/IFikaConfigClient";

import { FikaClientModHashesHelper } from "../helpers/FikaClientModHashesHelper";
import { IFikaCheckModRequestData } from "../models/fika/routes/client/check/IFikaCheckModRequestData";
import { IFikaCheckModResponse } from "../models/fika/routes/client/check/IFikaCheckModResponse";
import { FikaConfig } from "../utils/FikaConfig";

@injectable()
export class FikaClientController {
    constructor(
        @inject("FikaClientModHashesHelper") protected fikaClientModHashesHelper: FikaClientModHashesHelper,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        // empty
    }

    /**
     * Handle /fika/client/config
     */
    public handleClientConfig(): IFikaConfigClient {
        return this.fikaConfig.getConfig().client;
    }

    /**
     * Handle /fika/client/check/mods
     */
    public handleCheckMods(request: IFikaCheckModRequestData): IFikaCheckModResponse {
        const fikaConfig = this.fikaConfig.getConfig();

        const mismatchedMods: IFikaCheckModResponse = {
            forbidden: [],
            missingRequired: [],
            hashMismatch: [],
        };

        // if no configuration was made, allow all mods
        if (fikaConfig.client.mods.required.length === 0 && fikaConfig.client.mods.optional.length === 0) {
            return mismatchedMods;
        }

        //check for missing required mods first
        for (const pluginId of fikaConfig.client.mods.required) {
            if (!request[pluginId]) {
                mismatchedMods.missingRequired.push(pluginId);
            }
        }

        // no need to check anything else since it's missing required mods
        if (mismatchedMods.missingRequired.length > 0) {
            return mismatchedMods;
        }

        for (const [pluginId, hash] of Object.entries(request)) {
            // check if the mod isn't in the required or optional mods list (meaning it's not allowed)
            if (!fikaConfig.client.mods.required.includes(pluginId) && !fikaConfig.client.mods.optional.includes(pluginId)) {
                mismatchedMods.forbidden.push(pluginId);
                continue;
            }

            // first request made will fill in at the very least all the required mods hashes, following requests made by different clients will add any optional mod not added by the first request, otherwise will check against the first request data
            if (this.fikaClientModHashesHelper.exists(pluginId)) {
                if (this.fikaClientModHashesHelper.getHash(pluginId) !== hash) {
                    mismatchedMods.hashMismatch.push(pluginId);
                }
            } else {
                this.fikaClientModHashesHelper.addHash(pluginId, hash);
            }
        }

        return mismatchedMods;
    }
}
