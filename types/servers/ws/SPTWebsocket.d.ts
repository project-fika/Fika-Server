import WebSocket from "ws";
export declare class SPTWebSocket extends WebSocket {
    sendAsync(data: any): Promise<void>;
    closeAsync(): Promise<void>;
}
