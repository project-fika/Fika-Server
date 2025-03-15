import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IHttpConfig extends IBaseConfig {
    kind: "spt-http";
    /** Address used by webserver */
    ip: string;
    port: number;
    /** Address used by game client to connect to */
    backendIp: string;
    backendPort: number;
    webSocketPingDelayMs: number;
    logRequests: boolean;
    /** e.g. "SPT_Data/Server/images/traders/579dc571d53a0658a154fbec.png": "SPT_Data/Server/images/traders/NewTraderImage.png" */
    serverImagePathOverride: Record<string, string>;
}
