import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IPmcChatResponse extends IBaseConfig {
    kind: "aki-pmcchatresponse";
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
