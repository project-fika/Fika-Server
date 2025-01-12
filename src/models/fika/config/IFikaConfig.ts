import { IFikaConfigBackground } from "./IFikaConfigBackground";
import { IFikaConfigClient } from "./IFikaConfigClient";
import { IFikaConfigDedicated } from "./IFikaConfigDedicated";
import { IFikaConfigNatPunchServer } from "./IFikaConfigNatPunchServer";
import { IFikaConfigServer } from "./IFikaConfigServer";

export interface IFikaConfig {
    client: IFikaConfigClient;
    server: IFikaConfigServer;
    natPunchServer: IFikaConfigNatPunchServer;
    dedicated: IFikaConfigDedicated;
    background: IFikaConfigBackground;
}
