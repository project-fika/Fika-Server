import { DependencyContainer } from "tsyringe";

import { IPreAkiLoadModAsync } from "@spt-aki/models/external/IPreAkiLoadModAsync";

import { Fika } from "./Fika";
import { Container } from "./di/Container";

class Mod implements IPreAkiLoadModAsync {
    public async preAkiLoadAsync(container: DependencyContainer): Promise<void> {
        Container.register(container);

        await container.resolve<Fika>("Fika").preAkiLoad(container);
    }
}

export const mod = new Mod();
