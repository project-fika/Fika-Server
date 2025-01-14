import { inject, injectable } from "tsyringe";

import type { ILogger } from "@spt/models/spt/utils/ILogger";

import { IHeadlessClientInfo } from "../../models/fika/headless/IHeadlessClientInfo";
import { FikaHeadlessRaidWebSocket } from "../../websockets/FikaHeadlessRaidWebSocket";

@injectable()
export class FikaHeadlessRaidService {
    public headlessClients: Record<string, IHeadlessClientInfo>;
    public requestedSessions: Record<string, string>;
    public onNoHeadlessClientAvailable?: () => void;
    public onHeadlessClientAvailable?: () => void;
    public onHeadlessClientResponse?: (sessionID: string) => void;

    constructor(
        @inject("FikaHeadlessRaidWebSocket") protected fikaHeadlessRaidWebSocket: FikaHeadlessRaidWebSocket,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        this.headlessClients = {};
        this.requestedSessions = {};

        // TODO: find a more elegant solution to keep track of headless clients being available.
        setInterval(() => {
            const currentTime = Date.now();

            for (const HeadlessclientSessionId in this.headlessClients) {
                const HeadlessclientLastPing = this.headlessClients[HeadlessclientSessionId].lastPing;

                if (currentTime - HeadlessclientLastPing > 16000) {
                    delete this.headlessClients[HeadlessclientSessionId];
                    logger.info(`Headless client removed: ${HeadlessclientSessionId}`);
                }

                if (!this.isHeadlessClientAvailable()) {
                    if (this.onNoHeadlessClientAvailable) {
                        this.onNoHeadlessClientAvailable();
                    }
                }
            }
        }, 5000);
    }

    public handleRequestedSessions(matchId: string): void {
        if (matchId in this.requestedSessions) {
            const userToJoin = this.requestedSessions[matchId];

            this.fikaHeadlessRaidWebSocket.clientWebSockets[userToJoin].send(
                JSON.stringify({
                    type: "fikaHeadlessJoinMatch",
                    matchId: matchId,
                }),
            );

            this.logger.info(`Told ${userToJoin} to join raid ${matchId}`);
        }
    }

    public isHeadlessClientAvailable(): boolean {
        return Object.keys(this.headlessClients).length > 0;
    }
}
