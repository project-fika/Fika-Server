export interface ISettingsBase {
    config: IConfig;
}
export interface IConfig {
    AFKTimeoutSeconds: number;
    AdditionalRandomDelaySeconds: number;
    ClientSendRateLimit: number;
    CriticalRetriesCount: number;
    DefaultRetriesCount: number;
    FirstCycleDelaySeconds: number;
    FramerateLimit: IFramerateLimit;
    GroupStatusInterval: number;
    GroupStatusButtonInterval: number;
    KeepAliveInterval: number;
    LobbyKeepAliveInterval: number;
    Mark502and504AsNonImportant: boolean;
    MemoryManagementSettings: IMemoryManagementSettings;
    NVidiaHighlights: boolean;
    NextCycleDelaySeconds: number;
    PingServerResultSendInterval: number;
    PingServersInterval: number;
    ReleaseProfiler: IReleaseProfiler;
    RequestConfirmationTimeouts: number[];
    RequestsMadeThroughLobby: string[];
    SecondCycleDelaySeconds: number;
    ShouldEstablishLobbyConnection: boolean;
    TurnOffLogging: boolean;
    WeaponOverlapDistanceCulling: number;
    WebDiagnosticsEnabled: boolean;
    NetworkStateView: INetworkStateView;
    WsReconnectionDelays: string[];
}
export interface IFramerateLimit {
    MaxFramerateGameLimit: number;
    MaxFramerateLobbyLimit: number;
    MinFramerateLimit: number;
}
export interface IMemoryManagementSettings {
    AggressiveGC: boolean;
    GigabytesRequiredToDisableGCDuringRaid: number;
    HeapPreAllocationEnabled: boolean;
    HeapPreAllocationMB: number;
    OverrideRamCleanerSettings: boolean;
    RamCleanerEnabled: boolean;
}
export interface IReleaseProfiler {
    Enabled: boolean;
    MaxRecords: number;
    RecordTriggerValue: number;
}
export interface INetworkStateView {
    LossThreshold: number;
    RttThreshold: number;
}
