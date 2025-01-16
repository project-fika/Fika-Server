export interface IFikaConfigServer {
    SPT: IFikaSPTServerConfig;
    sentItemsLoseFIR: boolean;
    launcherListAllProfiles: boolean;
    sessionTimeout: number;
    showDevProfile: boolean;
    showNonStandardProfile: boolean;
}

export interface IFikaSPTServerConfig {
    http: IFikaSPTHttpServerConfig;
    disableSPTChatBots: boolean;
}

export interface IFikaSPTHttpServerConfig {
    ip: string;
    port: number;
    backendIp: string;
    backendPort: number;
}
