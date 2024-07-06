import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IPmcChatResponse extends IBaseConfig {
    kind: "spt-pmcchatresponse";
    victim: IResponseSettings;
    killer: IResponseSettings;
}
export interface IResponseSettings {
    responseChancePercent: number;
    responseTypeWeights: Record<string, number>;
    stripCapitalisationChancePercent: number;
    allCapsChancePercent: number;
    appendBroToMessageEndChancePercent: number;
}
