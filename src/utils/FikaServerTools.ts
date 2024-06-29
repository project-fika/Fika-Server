import { ILogger } from "@spt/models/spt/utils/ILogger";
import { inject, injectable } from "tsyringe";
import { FikaConfig } from "./FikaConfig";
import { IFikaConfigNatPunchServer } from "../models/fika/config/IFikaConfigNatPunchServer";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import path from "node:path";

@injectable()
export class FikaServerTools {
    protected natPunchServerConfig: IFikaConfigNatPunchServer;
    protected httpConfig: IHttpConfig;
    protected modFullPath: string;
    protected processes: Record<string, ChildProcessWithoutNullStreams> = {};

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("ConfigServer") protected configServer: ConfigServer,
    ) {
        this.natPunchServerConfig = fikaConfig.getConfig().natPunchServer;
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
        this.modFullPath = path.join(__dirname, "../../");
    }

    public startService(serviceName: string): ChildProcessWithoutNullStreams {
        const serverToolsPath = path.join(this.modFullPath, "FikaServerTools.exe");
        var serverToolsArgs: string[];

        switch(serviceName)
        {
            case "NatPunchServer":
                const ip = this.httpConfig.backendIp;
                const port = this.natPunchServerConfig.port;
                const natIntroduceAmount = this.natPunchServerConfig.natIntroduceAmount;
                serverToolsArgs = `-NatPunchServer -IP ${ip} -Port ${port} -NatIntroduceAmount ${natIntroduceAmount}`.split(" ");
                break;
            default:
                this.logger.error("[FikaServerTools] Unknown service name provided.");
                return;
        }

        if(serviceName in this.processes) {
            this.stopService(serviceName);
        }

        const process = spawn(serverToolsPath, serverToolsArgs);

        process.stdout.on("data", data => {
            var dataStr = data.toString();
            dataStr = dataStr.substring(0, dataStr.length - 1);
            this.logger.info(`[${serviceName}] ${dataStr}`);
        });

        process.stderr.on("data", data => {
            var dataStr = data.toString();
            dataStr = dataStr.substring(0, dataStr.length - 1);
            this.logger.info(`[${serviceName}] ${dataStr}`);
        });

        process.on("exit", code => {
            this.logger.error(`[${serviceName}] ended with code ${code}`);
        });

        this.processes[serviceName] = process;

        return process;
    }

    public stopService(serviceName: string): void {
        if(serviceName in this.processes) {
            const process = this.processes[serviceName];
            if(process != null) {
                if(!process.killed) {
                    process.kill();
                }
            }
        }
    }
}
