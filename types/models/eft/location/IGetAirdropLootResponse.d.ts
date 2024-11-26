import { IItem } from "@spt/models/eft/common/tables/IItem";
import { AirdropTypeEnum } from "@spt/models/enums/AirdropType";
export interface IGetAirdropLootResponse {
    icon: AirdropTypeEnum;
    container: IItem[];
}
