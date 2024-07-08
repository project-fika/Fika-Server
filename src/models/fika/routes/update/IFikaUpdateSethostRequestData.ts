export interface IFikaUpdateSethostRequestData {
    serverId: string;
    ips: string[];
    port: number;
    natPunch: boolean;
    isDedicated: boolean;
}
