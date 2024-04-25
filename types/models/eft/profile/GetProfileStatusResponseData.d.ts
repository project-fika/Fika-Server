export interface GetProfileStatusResponseData {
    maxPveCountExceeded: false;
    profiles: ProfileData[];
}
export interface ProfileData {
    profileid: string;
    profileToken: string;
    status: string;
    ip: string;
    port: number;
    sid: string;
    version?: string;
    location?: string;
    raidMode?: string;
    mode?: string;
    shortId?: string;
    additional_info?: any[];
}
