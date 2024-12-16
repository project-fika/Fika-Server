import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IBackupConfig extends IBaseConfig {
    kind: "spt-backup";
    enabled: boolean;
    maxBackups: number;
    directory: string;
    backupInterval: IBackupConfigInterval;
}
export interface IBackupConfigInterval {
    enabled: boolean;
    intervalMinutes: number;
}
