import { DependencyContainer } from "tsyringe";

import { IPreAkiLoadModAsync } from "@spt-aki/models/external/IPreAkiLoadModAsync";

import { Container } from "./di/Container";
import { Fika } from "./Fika";

class Mod implements IPreAkiLoadModAsync {
    public async preAkiLoadAsync(container: DependencyContainer): Promise<void> {
        Container.register(container);

        await container.resolve<Fika>("Fika").preAkiLoad(container);
    }
}

module.exports = { mod: new Mod() };
