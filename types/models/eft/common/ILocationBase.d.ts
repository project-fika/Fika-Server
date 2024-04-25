import { MinMax } from "@spt-aki/models/common/MinMax";
import { Ixyz } from "@spt-aki/models/eft/common/Ixyz";
export interface ILocationBase {
    AccessKeys: string[];
    AirdropParameters: AirdropParameter[];
    Area: number;
    AveragePlayTime: number;
    AveragePlayerLevel: number;
    Banners: Banner[];
    BossLocationSpawn: BossLocationSpawn[];
    BotAssault: number;
    BotEasy: number;
    BotHard: number;
    BotImpossible: number;
    BotLocationModifier: BotLocationModifier;
    BotMarksman: number;
    BotMax: number;
    BotMaxPlayer: number;
    BotMaxTimePlayer: number;
    BotNormal: number;
    BotSpawnCountStep: number;
    BotSpawnPeriodCheck: number;
    BotSpawnTimeOffMax: number;
    BotSpawnTimeOffMin: number;
    BotSpawnTimeOnMax: number;
    BotSpawnTimeOnMin: number;
    BotStart: number;
    BotStop: number;
    Description: string;
    DisabledForScav: boolean;
    DisabledScavExits: string;
    Enabled: boolean;
    EnableCoop: boolean;
    GlobalLootChanceModifier: number;
    GlobalContainerChanceModifier: number;
    IconX: number;
    IconY: number;
    Id: string;
    Insurance: boolean;
    IsSecret: boolean;
    Locked: boolean;
    Loot: any[];
    MatchMakerMinPlayersByWaitTime: MinPlayerWaitTime[];
    MaxBotPerZone: number;
    MaxDistToFreePoint: number;
    MaxPlayers: number;
    MinDistToExitPoint: number;
    MinDistToFreePoint: number;
    MinMaxBots: MinMaxBot[];
    MinPlayers: number;
    MaxCoopGroup: number;
    Name: string;
    NonWaveGroupScenario: INonWaveGroupScenario;
    NewSpawn: boolean;
    OcculsionCullingEnabled: boolean;
    OldSpawn: boolean;
    OpenZones: string;
    Preview: Preview;
    PlayersRequestCount: number;
    RequiredPlayerLevel?: number;
    RequiredPlayerLevelMin?: number;
    RequiredPlayerLevelMax?: number;
    MinPlayerLvlAccessKeys: number;
    PmcMaxPlayersInGroup: number;
    ScavMaxPlayersInGroup: number;
    Rules: string;
    SafeLocation: boolean;
    Scene: Scene;
    SpawnPointParams: SpawnPointParam[];
    UnixDateTime: number;
    _Id: string;
    doors: any[];
    EscapeTimeLimit: number;
    EscapeTimeLimitCoop: number;
    exit_access_time: number;
    exit_count: number;
    exit_time: number;
    exits: Exit[];
    filter_ex: string[];
    limits: ILimit[];
    matching_min_seconds: number;
    GenerateLocalLootCache: boolean;
    maxItemCountInLocation: MaxItemCountInLocation[];
    sav_summon_seconds: number;
    tmp_location_field_remove_me: number;
    users_gather_seconds: number;
    users_spawn_seconds_n: number;
    users_spawn_seconds_n2: number;
    users_summon_seconds: number;
    waves: Wave[];
}
export interface INonWaveGroupScenario {
    Chance: number;
    Enabled: boolean;
    MaxToBeGroup: number;
    MinToBeGroup: number;
}
export interface ILimit extends MinMax {
    items: any[];
}
export interface AirdropParameter {
    AirdropPointDeactivateDistance: number;
    MinPlayersCountToSpawnAirdrop: number;
    PlaneAirdropChance: number;
    PlaneAirdropCooldownMax: number;
    PlaneAirdropCooldownMin: number;
    PlaneAirdropEnd: number;
    PlaneAirdropMax: number;
    PlaneAirdropStartMax: number;
    PlaneAirdropStartMin: number;
    UnsuccessfulTryPenalty: number;
}
export interface Banner {
    id: string;
    pic: Pic;
}
export interface Pic {
    path: string;
    rcid: string;
}
export interface BossLocationSpawn {
    BossChance: number;
    BossDifficult: string;
    BossEscortAmount: string;
    BossEscortDifficult: string;
    BossEscortType: string;
    BossName: string;
    BossPlayer: boolean;
    BossZone: string;
    RandomTimeSpawn: boolean;
    Time: number;
    TriggerId: string;
    TriggerName: string;
    Delay?: number;
    ForceSpawn?: boolean;
    IgnoreMaxBots?: boolean;
    Supports?: BossSupport[];
    sptId?: string;
}
export interface BossSupport {
    BossEscortAmount: string;
    BossEscortDifficult: string[];
    BossEscortType: string;
}
export interface BotLocationModifier {
    AccuracySpeed: number;
    DistToActivate: number;
    DistToPersueAxemanCoef: number;
    DistToSleep: number;
    GainSight: number;
    KhorovodChance: number;
    MagnetPower: number;
    MarksmanAccuratyCoef: number;
    Scattering: number;
    VisibleDistance: number;
}
export interface MinMaxBot extends MinMax {
    WildSpawnType: WildSpawnType | string;
}
export interface MinPlayerWaitTime {
    minPlayers: number;
    time: number;
}
export interface Preview {
    path: string;
    rcid: string;
}
export interface Scene {
    path: string;
    rcid: string;
}
export interface SpawnPointParam {
    BotZoneName: string;
    Categories: string[];
    ColliderParams: ColliderParams;
    CorePointId: number;
    DelayToCanSpawnSec: number;
    Id: string;
    Infiltration: string;
    Position: Ixyz;
    Rotation: number;
    Sides: string[];
}
export interface ColliderParams {
    _parent: string;
    _props: Props;
}
export interface Props {
    Center: Ixyz;
    Radius: number;
}
export interface Exit {
    /** % Chance out of 100 exit will appear in raid */
    Chance: number;
    Count: number;
    EntryPoints: string;
    EventAvailable: boolean;
    ExfiltrationTime: number;
    ExfiltrationType: string;
    RequiredSlot?: string;
    Id: string;
    MaxTime: number;
    MinTime: number;
    Name: string;
    PassageRequirement: string;
    PlayersCount: number;
    RequirementTip: string;
    Side?: string;
}
export interface MaxItemCountInLocation {
    TemplateId: string;
    Value: number;
}
export interface Wave {
    BotPreset: string;
    BotSide: string;
    SpawnPoints: string;
    WildSpawnType: WildSpawnType;
    isPlayers: boolean;
    number: number;
    slots_max: number;
    slots_min: number;
    time_max: number;
    time_min: number;
    sptId?: string;
    ChanceGroup?: number;
}
export declare enum WildSpawnType {
    ASSAULT = "assault",
    MARKSMAN = "marksman",
    PMCBOT = "pmcbot"
}
