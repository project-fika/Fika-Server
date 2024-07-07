import { ILoginRequestData } from "@spt/models/eft/launcher/ILoginRequestData";
export interface IChangeRequestData extends ILoginRequestData {
    change: string;
}
