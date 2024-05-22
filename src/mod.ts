import { DependencyContainer } from "tsyringe";

import { IPreSptLoadModAsync } from "@spt/models/external/IPreSptLoadModAsync";

import { Fika } from "./Fika";
import { Container } from "./di/Container";

class Mod implements IPreSptLoadModAsync {
    public async preSptLoadAsync(container: DependencyContainer): Promise<void> {
        Container.register(container);

        await container.resolve<Fika>("Fika").preSptLoad(container);
    }
}

export const mod = new Mod();
