import { IFikaConfigClient } from "./IFikaConfigClient";
import { IFikaConfigServer } from "./IFikaConfigServer";
import { IFikaConfigNatPunchServer } from "./IFikaConfigNatPunchServer";
import { IFikaConfigDedicated } from "./IFikaConfigDedicated";

export interface IFikaConfig {
    client: IFikaConfigClient;
    server: IFikaConfigServer;
    natPunchServer: IFikaConfigNatPunchServer;
    dedicated: IFikaConfigDedicated;
}
