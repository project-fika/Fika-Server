import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IHttpConfig extends IBaseConfig {
    webSocketPingDelayMs: number;
    kind: "aki-http";
    ip: string;
    port: number;
    logRequests: boolean;
    /** e.g. "Aki_Data/Server/images/traders/579dc571d53a0658a154fbec.png": "Aki_Data/Server/images/traders/NewTraderImage.png" */
    serverImagePathOverride: Record<string, string>;
}
