import { RaidMode } from "@spt-aki/models/enums/RaidMode";
export interface IMatchGroupStatusRequest {
    location: string;
    savage: boolean;
    dt: string;
    keyId: string;
    raidMode: RaidMode;
    spawnPlace: string;
}
