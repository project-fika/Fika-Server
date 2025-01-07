import { IStaticAmmoDetails, IStaticContainerProps, IStaticForcedProps, IStaticLootDetails } from "@spt/models/eft/common/ILocation";
import { ILooseLoot, ISpawnpointTemplate } from "@spt/models/eft/common/ILooseLoot";
export interface ILocationGenerator {
    generateContainerLoot(containerIn: IStaticContainerProps, staticForced: IStaticForcedProps[], staticLootDist: Record<string, IStaticLootDetails>, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, locationName: string): IStaticContainerProps;
    generateDynamicLoot(dynamicLootDist: ILooseLoot, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, locationName: string): ISpawnpointTemplate[];
}
