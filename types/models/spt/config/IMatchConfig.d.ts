import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IMatchConfig extends IBaseConfig {
    kind: "aki-match";
    enabled: boolean;
}
