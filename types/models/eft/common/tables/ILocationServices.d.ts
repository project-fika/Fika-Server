import { Ixyz } from "@spt/models/eft/common/Ixyz";
export interface ILocationServices {
    TraderServerSettings: ITraderServerSettings;
    BTRServerSettings: IBtrServerSettings;
}
export interface ITraderServerSettings {
    TraderServices: ITraderServices;
}
export interface ITraderServices {
    ExUsecLoyalty: ITraderService;
    ZryachiyAid: ITraderService;
    CultistsAid: ITraderService;
    PlayerTaxi: ITraderService;
    BtrItemsDelivery: ITraderService;
    BtrBotCover: ITraderService;
    TransitItemsDelivery: ITraderService;
}
export interface ITraderService {
    TraderId: string;
    TraderServiceType: string;
    Requirements: IServiceRequirements;
    ServiceItemCost: Record<string, IServiceItemCostDetails>;
    UniqueItems: string[];
}
export interface IServiceRequirements {
    CompletedQuests: ICompletedQuest[];
    Standings: Record<string, IStandingRequirement>;
}
export interface ICompletedQuest {
    QuestId: string;
}
export interface IStandingRequirement {
    Value: number;
}
export interface IServiceItemCostDetails {
    Count: number;
}
export interface IBtrServerSettings {
    ChanceSpawn: number;
    SpawnPeriod: Ixyz;
    MoveSpeed: number;
    ReadyToDepartureTime: number;
    CheckTurnDistanceTime: number;
    TurnCheckSensitivity: number;
    DecreaseSpeedOnTurnLimit: number;
    EndSplineDecelerationDistance: number;
    AccelerationSpeed: number;
    DecelerationSpeed: number;
    PauseDurationRange: Ixyz;
    BodySwingReturnSpeed: number;
    BodySwingDamping: number;
    BodySwingIntensity: number;
    ServerMapBTRSettings: Record<string, IServerMapBtrsettings>;
}
export interface IServerMapBtrsettings {
    MapID: string;
    ChanceSpawn: number;
    SpawnPeriod: Ixyz;
    MoveSpeed: number;
    ReadyToDepartureTime: number;
    CheckTurnDistanceTime: number;
    TurnCheckSensitivity: number;
    DecreaseSpeedOnTurnLimit: number;
    EndSplineDecelerationDistance: number;
    AccelerationSpeed: number;
    DecelerationSpeed: number;
    PauseDurationRange: Ixyz;
    BodySwingReturnSpeed: number;
    BodySwingDamping: number;
    BodySwingIntensity: number;
}
