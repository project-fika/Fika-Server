export interface IFikaConfigServer {
    SPT: IFikaSPTServerConfig;
    allowItemSending: boolean;
    sentItemsLoseFIR: boolean;
    launcherListAllProfiles: boolean;
    sessionTimeout: number;
    showDevProfile: boolean;
    showNonStandardProfile: boolean;
    logClientModsInConsole: boolean;
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
