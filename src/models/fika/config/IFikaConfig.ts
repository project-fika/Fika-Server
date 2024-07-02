import { IFikaConfigClient } from "./IFikaConfigClient";
import { IFikaConfigServer } from "./IFikaConfigServer";
import { IFikaConfigNatPunchServer } from "./IFikaConfigNatPunchServer";

export interface IFikaConfig {
    client: IFikaConfigClient;
    server: IFikaConfigServer;
    natPunchServer: IFikaConfigNatPunchServer;
}
