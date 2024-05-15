import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IInsuranceConfig extends IBaseConfig {
    kind: "aki-insurance";
    /** Insurance price multiplier */
    insuranceMultiplier: Record<string, number>;
    /** Chance item is returned as insurance, keyed by trader id */
    returnChancePercent: Record<string, number>;
    /** Item slots that should never be returned as insurance */
    blacklistedEquipment: string[];
    /** Some slots should always be removed, e.g. 'cartridges' */
    slotIdsToAlwaysRemove: string[];
    /** Override to control how quickly insurance is processed/returned in second */
    returnTimeOverrideSeconds: number;
    /** How often server should process insurance in seconds */
    runIntervalSeconds: number;
    minAttachmentRoublePriceToBeTaken: number;
    chanceNoAttachmentsTakenPercent: number;
}
