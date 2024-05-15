export interface IJoinMatchRequestData {
    groupId: string;
    servers: Server[];
}
export interface Server {
    ping: number;
    ip: string;
    port: string;
}
