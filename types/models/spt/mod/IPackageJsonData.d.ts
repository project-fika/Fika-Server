export interface IPackageJsonData {
    incompatibilities?: string[];
    loadBefore?: string[];
    loadAfter?: string[];
    dependencies?: Record<string, string>;
    modDependencies?: Record<string, string>;
    name: string;
    url: string;
    author: string;
    version: string;
    sptVersion: string;
    /** We deliberately purge this data */
    scripts: Record<string, string>;
    devDependencies: Record<string, string>;
    licence: string;
    main: string;
    isBundleMod: boolean;
    contributors: string[];
}
