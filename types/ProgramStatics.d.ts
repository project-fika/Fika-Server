import { EntryType } from "./models/enums/EntryType";
export declare class ProgramStatics {
    private static _ENTRY_TYPE;
    private static _DEBUG;
    private static _COMPILED;
    private static _MODS;
    private static _EXPECTED_NODE;
    private static _SPT_VERSION;
    private static _COMMIT;
    private static _BUILD_TIME;
    static initialize(): void;
    static get ENTRY_TYPE(): EntryType;
    static get DEBUG(): boolean;
    static get COMPILED(): boolean;
    static get MODS(): boolean;
    static get EXPECTED_NODE(): string;
    static get SPT_VERSION(): string;
    static get COMMIT(): string;
    static get BUILD_TIME(): number;
}
