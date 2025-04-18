import { inject, injectable } from "tsyringe";

import { SaveServer } from "@spt/servers/SaveServer";
import { EHeadlessStatus } from "../models/enums/EHeadlessStatus";
import { IHeadlessAvailableClients } from "../models/fika/headless/IHeadlessAvailableClients";
import { IHeadlessClientInfo } from "../models/fika/headless/IHeadlessClientInfo";
import { FikaHeadlessProfileService } from "../services/headless/FikaHeadlessProfileService";
import { FikaHeadlessService } from "../services/headless/FikaHeadlessService";
import { FikaConfig } from "../utils/FikaConfig";

@injectable()
export class FikaHeadlessHelper {
    constructor(
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("FikaHeadlessService") protected FikaHeadlessService: FikaHeadlessService,
        @inject("FikaHeadlessProfileService") protected fikaHeadlessProfileService: FikaHeadlessProfileService,
    ) {
        // empty
    }

    /**
     * Gets all currently logged in headlesses
     *
     * @returns A map where the key is the sessionID and the value is an IHeadlessClientInfo object
     */
    public getHeadlessClients(): Map<string, IHeadlessClientInfo> {
        return this.FikaHeadlessService.getHeadlessClients();
    }

    /**
     * Allows for checking if a SessionID is a headless client
     *
     * @param sessionId The sessionID to check
     * @returns Returns true if the passed sessionID is a headless, returns false if not.
     */
    public isHeadlessClient(sessionId: string): boolean {
        return this.fikaHeadlessProfileService.getHeadlessProfiles().some((profile) => profile.info.id === sessionId);
    }

    /**
     * Allows for checking if the given headless client is available
     *
     * @returns Returns true if it's available, returns false if it isn't available.
     */
    public isHeadlessClientAvailable(headlessSessionID: string): boolean {
        const headless = this.FikaHeadlessService.getHeadlessClients().get(headlessSessionID);

        if (!headless) {
            return false;
        }

        if (headless.state === EHeadlessStatus.READY) {
            return true;
        }

        return false;
    }

    /**
     * Gets the requester's username for a headless client if there is any.
     *
     * @returns The nickname if the headless has been requested by a user, returns null if not.
     */
    public getRequesterUsername(headlessSessionID: string): string | null {
        const headlessClient = this.FikaHeadlessService.getHeadlessClients().get(headlessSessionID);

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
    public getHeadlessNickname(headlessSessionID: string): string {
        const AliasName = this.fikaConfig.getConfig().headless.profiles.aliases[headlessSessionID];

        if (!AliasName) {
            return this.saveServer.getProfile(headlessSessionID).characters.pmc.Info.Nickname;
        }

        return AliasName;
    }

    /**
     * Gets all available headless clients
     *
     * @returns Returns an array of available headless clients
     */
    public getAvailableHeadlessClients(): IHeadlessAvailableClients[] {
        const headlessClients: IHeadlessAvailableClients[] = [];

        for (const [headlessSessionID, headless] of this.getHeadlessClients()) {
            if (headless.state === EHeadlessStatus.READY) {
                const availableHeadlessClient: IHeadlessAvailableClients = {
                    headlessSessionID: headlessSessionID,
                    alias: this.getHeadlessNickname(headlessSessionID),
                };

                headlessClients.push(availableHeadlessClient);
            }
        }

        return headlessClients;
    }
}
