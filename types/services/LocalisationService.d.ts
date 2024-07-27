import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { LocaleService } from "@spt/services/LocaleService";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { I18n } from "i18n";
/**
 * Handles translating server text into different langauges
 */
export declare class LocalisationService {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected localeService: LocaleService;
    protected i18n: I18n;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseServer: DatabaseServer, localeService: LocaleService);
    /**
     * Get a localised value using the passed in key
     * @param key Key to loop up locale for
     * @param args optional arguments
     * @returns Localised string
     */
    getText(key: string, args?: any): string;
    /**
     * Get all locale keys
     * @returns string array of keys
     */
    getKeys(): string[];
    /**
     * From the provided partial key, find all keys that start with text and choose a random match
     * @param partialKey Key to match locale keys on
     * @returns locale text
     */
    getRandomTextThatMatchesPartialKey(partialKey: string): string;
}
