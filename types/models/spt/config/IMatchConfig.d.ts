import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IMatchConfig extends IBaseConfig {
    kind: "spt-match";
    enabled: boolean;
}
