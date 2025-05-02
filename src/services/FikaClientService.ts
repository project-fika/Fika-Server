import { inject, injectable } from "tsyringe";

import { IFikaConfigClient } from "../models/fika/config/IFikaConfigClient";

import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { SaveServer } from "@spt/servers/SaveServer";

import { FikaClientModHashesHelper } from "../helpers/FikaClientModHashesHelper";
import { IFikaConfigHeadless } from "../models/fika/config/IFikaConfigHeadless";
import { IFikaConfigNatPunchServer } from "../models/fika/config/IFikaConfigNatPunchServer";
import { IFikaCheckModRequestData } from "../models/fika/routes/client/check/IFikaCheckModRequestData";
import { IFikaCheckModResponse, IVersionCheckResponse } from "../models/fika/routes/client/check/IFikaCheckModResponse";
import { FikaConfig } from "../utils/FikaConfig";

@injectable()
export class FikaClientService {
    protected requiredMods: string[] = [];
    protected allowedMods: string[] = [];
    protected hasRequiredOrOptionalMods: boolean = true;

    constructor(
        @inject("FikaClientModHashesHelper") protected fikaClientModHashesHelper: FikaClientModHashesHelper,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {}

    public async preInit(): Promise<void> {
        const config = this.fikaConfig.getConfig();

        const sanitizedRequiredMods = this.filterEmptyMods(config.client.mods.required);
        const sanitizedOptionalMods = this.filterEmptyMods(config.client.mods.optional);

        if (sanitizedRequiredMods.length === 0 && sanitizedOptionalMods.length === 0) {
            this.hasRequiredOrOptionalMods = false;
        }

        this.requiredMods = [...sanitizedRequiredMods, "com.fika.core", "com.SPT.custom", "com.SPT.singleplayer", "com.SPT.core", "com.SPT.debugging"];
        this.allowedMods = [...this.requiredMods, ...sanitizedOptionalMods, "com.bepis.bepinex.configurationmanager", "com.fika.headless"];
    }

    protected filterEmptyMods(array: string[]): string[] {
        return array.filter((str) => str.trim() !== "");
    }

    public getClientConfig(): IFikaConfigClient {
        return this.fikaConfig.getConfig().client;
    }

    public getIsItemSendingAllowed(): boolean {
        return this.fikaConfig.getConfig().server.allowItemSending;
    }

    public getNatPunchServerConfig(): IFikaConfigNatPunchServer {
        return this.fikaConfig.getConfig().natPunchServer;
    }

    public getHeadlessConfig(): IFikaConfigHeadless {
        return this.fikaConfig.getConfig().headless;
    }

    public getVersion(): IVersionCheckResponse {
        const version = this.fikaConfig.getVersion();
        return { version };
    }

    public getCheckModsResponse(request: IFikaCheckModRequestData, sessionID: string): IFikaCheckModResponse {
        const mismatchedMods: IFikaCheckModResponse = {
            forbidden: [],
            missingRequired: [],
            hashMismatch: [],
        };

        if (this.fikaConfig.getConfig().server.logClientModsInConsole) {
            const username = this.saveServer.getProfile(sessionID).info.username;
            const mods = Object.keys(request);

            this.logger.info(`${username} (${sessionID}) connected with ${mods.length} client mods: ${mods.join(", ")}`);
        }

        // if no configuration was made, allow all mods
        if (!this.hasRequiredOrOptionalMods) {
            return mismatchedMods;
        }

        //check for missing required mods first
        for (const pluginId of this.requiredMods) {
            if (!request[pluginId]) {
                mismatchedMods.missingRequired.push(pluginId);
            }
        }

        // no need to check anything else since it's missing required mods
        if (mismatchedMods.missingRequired.length > 0) {
            return mismatchedMods;
        }

        for (const [pluginId, hash] of Object.entries(request)) {
            // check if the mod isn't allowed
            if (!this.allowedMods.includes(pluginId)) {
                mismatchedMods.forbidden.push(pluginId);
                continue;
            }

            // first request made will fill in at the very least all the required mods hashes, following requests made by different clients will add any optional mod not added by the first request, otherwise will check against the first request data
            if (!this.fikaClientModHashesHelper.exists(pluginId)) {
                this.fikaClientModHashesHelper.addHash(pluginId, hash);
                continue;
            }

            if (this.fikaClientModHashesHelper.getHash(pluginId) !== hash) {
                mismatchedMods.hashMismatch.push(pluginId);
            }
        }

        return mismatchedMods;
    }

    public getProfileBySessionID(sessionID: string): any {
        const profile = this.saveServer.getProfile(sessionID);
        if (profile) {
            this.logger.info(`${sessionID} has downloaded their profile`);
            return profile;
        }

        this.logger.error(`${sessionID} wants to download their profile but we don't have it`);
        return null;
    }
}
