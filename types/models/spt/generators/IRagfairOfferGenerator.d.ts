import { Item } from "@spt/models/eft/common/tables/IItem";
import { IBarterScheme } from "@spt/models/eft/common/tables/ITrader";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
export interface IRagfairOfferGenerator {
    createOffer(userID: string, time: number, items: Item[], barterScheme: IBarterScheme[], loyalLevel: number, price: number, sellInOnePiece: boolean): IRagfairOffer;
}
