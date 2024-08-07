import { inject, injectable } from "tsyringe";

import { ILogger } from "@spt/models/spt/utils/ILogger";

import { IDedicatedClientInfo } from "../../models/fika/dedicated/IDedicatedClientInfo";
import { FikaDedicatedRaidWebSocket } from "../../websockets/FikaDedicatedRaidWebSocket";

@injectable()
export class FikaDedicatedRaidService {
    public dedicatedClients: Record<string, IDedicatedClientInfo>;
    public requestedSessions: Record<string, string>;
    public onNoDedicatedClientAvailable?: () => void;
    public onDedicatedClientAvailable?: () => void;
    public onDedicatedClientResponse?: (sessionID: string) => void;

    constructor(
        @inject("FikaDedicatedRaidWebSocket") protected fikaDedicatedRaidWebSocket: FikaDedicatedRaidWebSocket,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        this.dedicatedClients = {};
        this.requestedSessions = {};

        // TODO: find a more elegant solution to keep track of dedicated clients being available.
        setInterval(() => {
            const currentTime = Date.now();

            for (const dedicatedClientSessionId in this.dedicatedClients) {
                const dedicatedClientLastPing = this.dedicatedClients[dedicatedClientSessionId].lastPing;

                if (currentTime - dedicatedClientLastPing > 16000) {
                    delete this.dedicatedClients[dedicatedClientSessionId];
                    logger.info(`Dedicated client removed: ${dedicatedClientSessionId}`);
                }

                if (!this.isDedicatedClientAvailable()) {
                    if (this.onNoDedicatedClientAvailable) {
                        this.onNoDedicatedClientAvailable();
                    }
                }
            }
        }, 5000);
    }

    public handleRequestedSessions(matchId: string): void {
        if (matchId in this.requestedSessions) {
            const userToJoin = this.requestedSessions[matchId];

            this.fikaDedicatedRaidWebSocket.clientWebSockets[userToJoin].send(
                JSON.stringify({
                    type: "fikaDedicatedJoinMatch",
                    matchId: matchId,
                }),
            );

            this.logger.info(`Told ${userToJoin} to join raid ${matchId}`);
        }
    }

    public isDedicatedClientAvailable(): boolean {
        return Object.keys(this.dedicatedClients).length > 0;
    }
}
