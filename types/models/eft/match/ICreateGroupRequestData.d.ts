import { RaidMode } from "@spt-aki/models/enums/RaidMode";
export interface ICreateGroupRequestData {
    location: string;
    raidMode: RaidMode;
    startInGroup: boolean;
}
