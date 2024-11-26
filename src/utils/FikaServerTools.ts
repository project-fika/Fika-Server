import { ILogger } from "@spt/models/spt/utils/ILogger";
import { inject, injectable } from "tsyringe";
import { FikaConfig } from "./FikaConfig";
import { IFikaConfigNatPunchServer } from "../models/fika/config/IFikaConfigNatPunchServer";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import path from "node:path";
import fs from "fs";
import os from "os";

@injectable()
export class FikaServerTools {
    protected readonly name: string = "FikaServerTools";
    protected exePath: string;
    protected natPunchServerConfig: IFikaConfigNatPunchServer;
    protected httpConfig: IHttpConfig;

    protected processes: Record<string, ChildProcessWithoutNullStreams> = {};

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("ConfigServer") protected configServer: ConfigServer,
    ) {
        switch (os.platform()) {
            case "linux": {
                this.exePath = path.join(path.join(__dirname, "../../"), "FikaServerTools");
                break;
            }
            default: {
                this.exePath = path.join(path.join(__dirname, "../../"), "FikaServerTools.exe");
                break;
            }
        }
        this.natPunchServerConfig = fikaConfig.getConfig().natPunchServer;
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
    }

    public startService(serviceName: string): void {
        var exeArgs: string[];

        switch (serviceName) {
            case "NatPunchServer":
                const ip = this.httpConfig.ip;
                const port = this.natPunchServerConfig.port;
                const natIntroduceAmount = this.natPunchServerConfig.natIntroduceAmount;
                exeArgs = `-NatPunchServer -IP ${ip} -Port ${port} -NatIntroduceAmount ${natIntroduceAmount}`.split(" ");
                break;
            default:
                this.logError(this.name, `Unknown service name provided: ${serviceName}`);
                return;
        }

        if (!fs.existsSync(this.exePath)) {
            this.logError(this.name, `File not found: ${this.exePath}`);
            return;
        }

        if (serviceName in this.processes) {
            this.stopService(serviceName);
        }

        const process = spawn(this.exePath, exeArgs);

        process.stdout.on("data", (data) => {
            var dataStr = data.toString();
            dataStr = dataStr.substring(0, dataStr.length - 1);

            this.logInfo(serviceName, dataStr);
        });

        process.stderr.on("data", (data) => {
            var dataStr = data.toString();
            dataStr = dataStr.substring(0, dataStr.length - 1);

            this.logError(serviceName, dataStr);
        });

        process.on("exit", (code) => {
            this.logError(this.name, `FikaServerTools ended with code ${code}`);
        });

        this.processes[serviceName] = process;

        return;
    }

    public stopService(serviceName: string): void {
        if (serviceName in this.processes) {
            const process = this.processes[serviceName];
            if (process != null) {
                if (!process.killed) {
                    process.kill();
                }
            }
        }
    }

    public logInfo(serviceName: string, msg: string): void {
        this.logger.info(`[${serviceName}] ${msg}`);
    }

    public logError(serviceName: string, msg: string): void {
        this.logger.error(`[${serviceName}] ${msg}`);
    }
}
