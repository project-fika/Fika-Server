export interface IJoinMatchResult {
    maxPveCountExceeded: boolean;
    profiles: IJoinMatchPlayerProfile[];
}
export interface IJoinMatchPlayerProfile {
    profileid: string;
    profileToken: string;
    status: string;
    sid: string;
    ip: string;
    port: number;
    version: string;
    location: string;
    raidMode: string;
    mode: string;
    shortid: string;
    additional_info: any[];
}
