import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IHttpConfig extends IBaseConfig {
    kind: "aki-http";
    /** Address used by webserver */
    ip: string;
    port: number;
    /** Address used by game client to connect to */
    backendIp: string;
    backendPort: string;
    webSocketPingDelayMs: number;
    logRequests: boolean;
    /** e.g. "Aki_Data/Server/images/traders/579dc571d53a0658a154fbec.png": "Aki_Data/Server/images/traders/NewTraderImage.png" */
    serverImagePathOverride: Record<string, string>;
}
