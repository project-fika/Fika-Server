import { ILoginRequestData } from "@spt/models/eft/launcher/ILoginRequestData";
export interface IRegisterData extends ILoginRequestData {
    edition: string;
}
