import { ILocaleConfig } from "@spt/models/spt/config/ILocaleConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
/**
 * Handles getting locales from config or users machine
 */
export declare class LocaleService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected localeConfig: ILocaleConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, configServer: ConfigServer);
    /**
     * Get the eft globals db file based on the configured locale in config/locale.json, if not found, fall back to 'en'
     * @returns dictionary
     */
    getLocaleDb(): Record<string, string>;
    /**
     * Gets the game locale key from the locale.json file,
     * if value is 'system' get system locale
     * @returns locale e.g en/ge/cz/cn
     */
    getDesiredGameLocale(): string;
    /**
     * Gets the game locale key from the locale.json file,
     * if value is 'system' get system locale
     * @returns locale e.g en/ge/cz/cn
     */
    getDesiredServerLocale(): string;
    /**
     * Get array of languages supported for localisation
     * @returns array of locales e.g. en/fr/cn
     */
    getServerSupportedLocales(): string[];
    /**
     * Get array of languages supported for localisation
     * @returns array of locales e.g. en/fr/cn
     */
    getLocaleFallbacks(): {
        [locale: string]: string;
    };
    /**
     * Get the full locale of the computer running the server lowercased e.g. en-gb / pt-pt
     * @returns string
     */
    getPlatformForServerLocale(): string;
    /**
     * Get the locale of the computer running the server
     * @returns langage part of locale e.g. 'en' part of 'en-US'
     */
    protected getPlatformForClientLocale(): string;
    /**
     * This is in a function so we can overwrite it during testing
     * @returns The current platform locale
     */
    protected getPlatformLocale(): Intl.Locale;
}
