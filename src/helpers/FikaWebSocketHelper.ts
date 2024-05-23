import { inject, injectable } from "tsyringe";

import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { SaveServer } from "@spt-aki/servers/SaveServer";

import { WebSocketServer } from "@spt-aki/servers/WebSocketServer";
import { IFikaMatch } from "../models/fika/IFikaMatch"
import { FikaMatchService } from "../services/FikaMatchService";

@injectable()
export class FikaWebSocketHelper {
    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("WebSocketServer") protected webSocketServer: WebSocketServer,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("FikaMatchService") protected fikaMatchService: FikaMatchService
    ) {
    }

    notifyFikaMatchCreated(match: IFikaMatch, hostSessionId: string) {
        const matches = this.fikaMatchService.getAllMatches();

        // Should be all sessionIds where the sessionId is not in a match
        const sessionIds = Object.keys(this.saveServer.getProfiles())
            .filter(
                id => Object.values(matches).find(
                    (m: IFikaMatch) => Object.keys(m.players).includes(id)
                ) == undefined
            );

        for (const sessionId of sessionIds) {
            this.webSocketServer.sendMessage(sessionId, <any>{
                type: "fika_session_created",
                data: {
                    "hostUsername": match.hostUsername,
                    "locationData": match.locationData._Id
                }
            });
        }
    }
}
