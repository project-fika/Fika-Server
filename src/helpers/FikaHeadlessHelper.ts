import { inject, injectable } from "tsyringe";

import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { EHeadlessStatus } from "../models/enums/EHeadlessStatus";
import { FikaHeadlessProfileService } from "../services/headless/FikaHeadlessProfileService";
import { FikaHeadlessService } from "../services/headless/FikaHeadlessService";
import { FikaConfig } from "../utils/FikaConfig";

@injectable()
export class FikaHeadlessHelper {
    constructor(
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("FikaHeadlessService") protected FikaHeadlessService: FikaHeadlessService,
        @inject("FikaHeadlessProfileService") protected fikaHeadlessProfileService: FikaHeadlessProfileService,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        // empty
    }

    public isHeadlessClient(sessionId: string): boolean {
        return this.fikaHeadlessProfileService.getHeadlessProfiles().some((profile) => profile.info.id === sessionId);
    }

    /**
     * Allows for checking if there are any headless clients available
     *
     * @returns Returns true if one is available, returns false if none are available.
     */
    public HeadlessClientsAvailable(): boolean {
        return Array.from(this.FikaHeadlessService.getHeadlessClients().values()).some((client) => client.state === EHeadlessStatus.READY);
    }

    /**
     * Gets the requester's username for a headless client if there is any.
     *
     * @returns The nickname if the headless has been requested by a user, returns null if not.
     */
    public getRequesterUsername(headlessClientId: string): string | null {
        const headlessClient = this.FikaHeadlessService.getHeadlessClients().get(headlessClientId);

        if (!headlessClient) {
            return null;
        }

        if (!headlessClient.requesterSessionID) {
            return null;
        }

        return this.saveServer.getProfile(headlessClient.requesterSessionID).characters.pmc.Info.Nickname;
    }

    /***
     * Gets the alias (If it has been given one) or nickname of the headless client
     *
     * @returns the alias, or nickname or the headless client.
     */
    public getHeadlessNickname(sessionId: string): string {
        const AliasName = this.fikaConfig.getConfig().headless.profiles.aliases[sessionId];

        if (!AliasName) {
            return this.saveServer.getProfile(sessionId).characters.pmc.Info.Nickname;
        }

        return AliasName;
    }
}
