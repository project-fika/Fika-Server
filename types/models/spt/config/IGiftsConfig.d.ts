import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IUserDialogInfo } from "@spt-aki/models/eft/profile/IAkiProfile";
import { GiftSenderType } from "@spt-aki/models/enums/GiftSenderType";
import { SeasonalEventType } from "@spt-aki/models/enums/SeasonalEventType";
import { Traders } from "@spt-aki/models/enums/Traders";
import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
import { IProfileChangeEvent } from "../dialog/ISendMessageDetails";
export interface IGiftsConfig extends IBaseConfig {
    kind: "aki-gifts";
    gifts: Record<string, Gift>;
}
export interface Gift {
    /** Items to send to player */
    items: Item[];
    /** Who is sending the gift to player */
    sender: GiftSenderType;
    /** Optinal - supply a users id to send from, not necessary when sending from SYSTEM or TRADER */
    senderId?: string;
    senderDetails: IUserDialogInfo;
    /** Optional - supply a trader type to send from, not necessary when sending from SYSTEM or USER */
    trader?: Traders;
    messageText: string;
    /** Optional - if sending text from the client locale file */
    localeTextId?: string;
    /** Optional - Used by Seasonal events to send on specific day */
    timestampToSend?: number;
    associatedEvent: SeasonalEventType;
    collectionTimeHours: number;
    /** Optional, can be used to change profile settings like level/skills */
    profileChangeEvents?: IProfileChangeEvent[];
}
