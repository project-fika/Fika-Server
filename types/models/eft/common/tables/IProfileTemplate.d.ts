import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Dialogue, IUserBuilds } from "@spt/models/eft/profile/ISptProfile";
export interface IProfileTemplates {
    "Standard": IProfileSides;
    "Left Behind": IProfileSides;
    "Prepare To Escape": IProfileSides;
    "Edge Of Darkness": IProfileSides;
    "Unheard": IProfileSides;
    "Tournament": IProfileSides;
    "SPT Developer": IProfileSides;
    "SPT Easy start": IProfileSides;
    "SPT Zero to hero": IProfileSides;
}
export interface IProfileSides {
    descriptionLocaleKey: string;
    usec: ITemplateSide;
    bear: ITemplateSide;
}
export interface ITemplateSide {
    character: IPmcData;
    suits: string[];
    dialogues: Record<string, Dialogue>;
    userbuilds: IUserBuilds;
    trader: ProfileTraderTemplate;
}
export interface ProfileTraderTemplate {
    initialLoyaltyLevel: Record<string, number>;
    initialStanding: Record<string, number>;
    setQuestsAvailableForStart?: boolean;
    setQuestsAvailableForFinish?: boolean;
    initialSalesSum: number;
    jaegerUnlocked: boolean;
    /** How many days is usage of the flea blocked for upon profile creation */
    fleaBlockedDays?: number;
    /** What traders default to being locked on profile creation */
    lockedByDefaultOverride?: string[];
    /** What traders should have their clothing unlocked/purchased on creation */
    purchaseAllClothingByDefaultForTrader?: string[];
}
