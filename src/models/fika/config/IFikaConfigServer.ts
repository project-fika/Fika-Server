export interface IFikaConfigServer {
    SPT: IFikaSPTServerConfig;
    giftedItemsLoseFIR: boolean;
    launcherListAllProfiles: boolean;
    sessionTimeout: number;
    showDevProfile: boolean;
    showNonStandardProfile: boolean;
}

export interface IFikaSPTServerConfig {
    disableSPTChatBots: boolean;
}
