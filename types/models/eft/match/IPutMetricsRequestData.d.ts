export interface IPutMetricsRequestData {
    sid: string;
    settings: any;
    SharedSettings: ISharedSettings;
    HardwareDescription: IHardwareDescription;
    Location: string;
    Metrics: any;
    ClientEvents: IClientEvents;
    SpikeSamples: any[];
    mode: string;
}
export interface ISharedSettings {
    StatedFieldOfView: number;
}
export interface IHardwareDescription {
    deviceUniqueIdentifier: string;
    systemMemorySize: number;
    graphicsDeviceID: number;
    graphicsDeviceName: string;
    graphicsDeviceType: string;
    graphicsDeviceVendor: string;
    graphicsDeviceVendorID: number;
    graphicsDeviceVersion: string;
    graphicsMemorySize: number;
    graphicsMultiThreaded: boolean;
    graphicsShaderLevel: number;
    operatingSystem: string;
    processorCount: number;
    processorFrequency: number;
    processorType: string;
    driveType: string;
    swapDriveType: string;
}
export interface IClientEvents {
    MatchingCompleted: number;
    MatchingCompletedReal: number;
    LocationLoaded: number;
    LocationLoadedReal: number;
    GamePrepared: number;
    GamePreparedReal: number;
    GameCreated: number;
    GameCreatedReal: number;
    GamePooled: number;
    GamePooledReal: number;
    GameRunned: number;
    GameRunnedReal: number;
    GameSpawn: number;
    GameSpawnReal: number;
    PlayerSpawnEvent: number;
    PlayerSpawnEventReal: number;
    GameSpawned: number;
    GameSpawnedReal: number;
    GameStarting: number;
    GameStartingReal: number;
    GameStarted: number;
    GameStartedReal: number;
}
