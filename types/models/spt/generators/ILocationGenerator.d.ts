import { ILooseLoot, SpawnpointTemplate } from "@spt-aki/models/eft/common/ILooseLoot";
import { IStaticAmmoDetails, IStaticContainerProps, IStaticForcedProps, IStaticLootDetails } from "@spt-aki/models/eft/common/tables/ILootBase";
export interface ILocationGenerator {
    generateContainerLoot(containerIn: IStaticContainerProps, staticForced: IStaticForcedProps[], staticLootDist: Record<string, IStaticLootDetails>, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, locationName: string): IStaticContainerProps;
    generateDynamicLoot(dynamicLootDist: ILooseLoot, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, locationName: string): SpawnpointTemplate[];
}
