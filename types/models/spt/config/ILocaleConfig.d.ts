import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface ILocaleConfig extends IBaseConfig {
    kind: "spt-locale";
    /** e.g. ru/en/cn/fr etc, or 'system', will take computer locale setting */
    gameLocale: string;
    /** e.g. ru/en/cn/fr etc, or 'system', will take computer locale setting */
    serverLocale: string;
    /** Languages server can be translated into */
    serverSupportedLocales: string[];
    fallbacks: {
        [locale: string]: string;
    };
}
