export interface IChatServer {
    _id: string;
    RegistrationId: number;
    VersionId: string;
    Ip: string;
    Port: number;
    DateTime: number;
    Chats: IChat[];
    Regions: string[];
    /** Possibly removed */
    IsDeveloper?: boolean;
}
export interface IChat {
    _id: string;
    Members: number;
}
