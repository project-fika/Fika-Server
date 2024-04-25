import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IBarterScheme } from "@spt-aki/models/eft/common/tables/ITrader";
import { IRagfairOffer } from "@spt-aki/models/eft/ragfair/IRagfairOffer";
export interface IRagfairOfferGenerator {
    createOffer(userID: string, time: number, items: Item[], barterScheme: IBarterScheme[], loyalLevel: number, price: number, sellInOnePiece: boolean): IRagfairOffer;
}
