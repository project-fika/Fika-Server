export interface ILocaleBase {
    global: Record<string, Record<string, string>>;
    menu: Record<string, string>;
    languages: Record<string, string>;
    server: Record<string, Record<string, string>>;
}
