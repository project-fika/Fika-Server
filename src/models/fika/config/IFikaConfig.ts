import { IFikaConfigClient } from "./IFikaConfigClient";
import { IFikaConfigServer } from "./IFikaConfigServer";

export interface IFikaConfig {
    client: IFikaConfigClient;
    server: IFikaConfigServer;
}
