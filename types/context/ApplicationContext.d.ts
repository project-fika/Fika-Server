import { ContextVariable } from "@spt/context/ContextVariable";
import { ContextVariableType } from "@spt/context/ContextVariableType";
export declare class ApplicationContext {
    private variables;
    private static holderMaxSize;
    /**
     * Called like:
     * ```
     * const registerPlayerInfo = this.applicationContext.getLatestValue(ContextVariableType.REGISTER_PLAYER_REQUEST).getValue<IRegisterPlayerRequestData>();
     *
     * const activePlayerSessionId = this.applicationContext.getLatestValue(ContextVariableType.SESSION_ID).getValue<string>();
     *
     * const matchInfo = this.applicationContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION).getValue<IGetRaidConfigurationRequestData>();
     * ```
     */
    getLatestValue(type: ContextVariableType): ContextVariable | undefined;
    getValues(type: ContextVariableType): ContextVariable[] | undefined;
    addValue(type: ContextVariableType, value: any): void;
    clearValues(type: ContextVariableType): void;
}
