import { IStartHeadlessRequest } from "../../routes/raid/headless/IStartHeadlessRequest";
import { IFikaHeadlessBase } from "../IFikaHeadlessBase";

export interface IStartHeadlessRaid extends IFikaHeadlessBase {
    startRequest: IStartHeadlessRequest;
}
