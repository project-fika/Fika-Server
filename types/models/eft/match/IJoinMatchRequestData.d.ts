export interface IJoinMatchRequestData {
    groupid: string;
    servers: Server[];
}
export interface Server {
    ping: number;
    ip: string;
    port: string;
}
