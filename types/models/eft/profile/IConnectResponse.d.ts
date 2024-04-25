export interface IConnectResponse {
    backendUrl: string;
    name: string;
    editions: string[];
    profileDescriptions: Record<string, string>;
}
