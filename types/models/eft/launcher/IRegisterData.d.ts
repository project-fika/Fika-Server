import { ILoginRequestData } from "@spt-aki/models/eft/launcher/ILoginRequestData";
export interface IRegisterData extends ILoginRequestData {
    edition: string;
}
