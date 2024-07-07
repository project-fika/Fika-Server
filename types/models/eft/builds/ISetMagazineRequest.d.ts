import { IMagazineTemplateAmmoItem } from "../profile/ISptProfile";
export interface ISetMagazineRequest {
    Id: string;
    Name: string;
    Caliber: string;
    Items: IMagazineTemplateAmmoItem[];
    TopCount: number;
    BottomCount: number;
}
