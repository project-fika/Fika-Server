interface BuildOptions {
    type: string;
    arch: string;
    platform: string;
    start: boolean;
}
/**
 * Parses the command line arguments and returns the build options.
 *
 * @param args - The command line arguments.
 * @returns The build options: `type`, `arch`, `platform`, and `start`.
 */
export declare const getBuildOptions: (args: string[]) => BuildOptions;
export {};
