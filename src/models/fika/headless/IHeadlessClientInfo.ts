import { SPTWebSocket } from "@spt/servers/ws/SPTWebsocket";
import { EHeadlessStatus } from "../../enums/EHeadlessStatus";

export interface IHeadlessClientInfo {
    /** Websocket of the headless client */
    webSocket: SPTWebSocket;
    /** State of the headless client */
    state: EHeadlessStatus;
    /** The players that are playing on this headless client, only set if the state is IN_RAID */
    players?: string[];
    /** SessionID of the person who has requested the headless client, it will only ever be set if the status is IN_RAID */
    requesterSessionID?: string;
    /** Allows for checking if the requester has been notified the match has started through the requester WebSocket so he can auto-join */
    hasNotifiedRequester?: boolean;
}
