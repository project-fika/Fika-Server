import { IFikaConfigBackground } from "./IFikaConfigBackground";
import { IFikaConfigClient } from "./IFikaConfigClient";
import { IFikaConfigHeadless } from "./IFikaConfigHeadless";
import { IFikaConfigNatPunchServer } from "./IFikaConfigNatPunchServer";
import { IFikaConfigServer } from "./IFikaConfigServer";

export interface IFikaConfig {
    client: IFikaConfigClient;
    server: IFikaConfigServer;
    natPunchServer: IFikaConfigNatPunchServer;
    headless: IFikaConfigHeadless;
    background: IFikaConfigBackground;
}
