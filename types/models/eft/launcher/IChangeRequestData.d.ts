import { ILoginRequestData } from "@spt-aki/models/eft/launcher/ILoginRequestData";
export interface IChangeRequestData extends ILoginRequestData {
    change: string;
}
