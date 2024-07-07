import { DependencyContainer } from "tsyringe";

import { IPreSptLoadModAsync } from "@spt/models/external/IPreSptLoadModAsync";
import { IPostSptLoadModAsync } from "@spt/models/external/IPostSptLoadModAsync";

import { Fika } from "./Fika";
import { Container } from "./di/Container";

class Mod implements IPreSptLoadModAsync, IPostSptLoadModAsync {
    public async preSptLoadAsync(container: DependencyContainer): Promise<void> {
        Container.register(container);

        await container.resolve<Fika>("Fika").preSptLoad(container);
    }

    public async postSptLoadAsync(container: DependencyContainer): Promise<void> {
        await container.resolve<Fika>("Fika").postSptLoad(container);
    }
}

export const mod = new Mod();
