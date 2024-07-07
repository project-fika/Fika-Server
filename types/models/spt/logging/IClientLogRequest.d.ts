import { LogLevel } from "@spt/models/spt/logging/LogLevel";
export interface IClientLogRequest {
    Source: string;
    Level: LogLevel | string;
    Message: string;
    Color?: string;
    BackgroundColor?: string;
}
