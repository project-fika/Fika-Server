import "reflect-metadata";
import fs from "node:fs";
import { IAsyncQueue } from "@spt/models/spt/utils/IAsyncQueue";
export declare class VFS {
    protected asyncQueue: IAsyncQueue;
    accessFilePromisify: (path: fs.PathLike, mode?: number) => Promise<void>;
    copyFilePromisify: (src: fs.PathLike, dst: fs.PathLike, flags?: number) => Promise<void>;
    mkdirPromisify: (path: fs.PathLike, options: fs.MakeDirectoryOptions & {
        recursive: true;
    }) => Promise<string | undefined>;
    readFilePromisify: (path: fs.PathLike) => Promise<Buffer>;
    writeFilePromisify: (path: fs.PathLike, data: string, options?: any) => Promise<void>;
    readdirPromisify: (path: fs.PathLike, options?: BufferEncoding | {
        encoding: BufferEncoding;
        withFileTypes?: false;
    }) => Promise<string[]>;
    statPromisify: (path: fs.PathLike, options?: fs.StatOptions & {
        bigint?: false;
    }) => Promise<fs.Stats>;
    unlinkPromisify: (path: fs.PathLike) => Promise<void>;
    rmdirPromisify: (path: fs.PathLike) => Promise<void>;
    renamePromisify: (oldPath: fs.PathLike, newPath: fs.PathLike) => Promise<void>;
    constructor(asyncQueue: IAsyncQueue);
    exists(filepath: fs.PathLike): boolean;
    existsAsync(filepath: fs.PathLike): Promise<boolean>;
    copyFile(filepath: fs.PathLike, target: fs.PathLike): void;
    copyAsync(filepath: fs.PathLike, target: fs.PathLike): Promise<void>;
    createDir(filepath: string): void;
    createDirAsync(filepath: string): Promise<void>;
    copyDir(filepath: string, target: string, fileExtensions?: string | string[]): void;
    copyDirAsync(filepath: string, target: string, fileExtensions: string | string[]): Promise<void>;
    readFile(...args: Parameters<typeof fs.readFileSync>): string;
    readFileAsync(path: fs.PathLike): Promise<string>;
    private isBuffer;
    writeFile(filepath: any, data?: string, append?: boolean, atomic?: boolean): void;
    writeFileAsync(filepath: any, data?: string, append?: boolean, atomic?: boolean): Promise<void>;
    getFiles(filepath: string): string[];
    getFilesAsync(filepath: string): Promise<string[]>;
    getDirs(filepath: string): string[];
    getDirsAsync(filepath: string): Promise<string[]>;
    removeFile(filepath: string): void;
    removeFileAsync(filepath: string): Promise<void>;
    removeDir(filepath: string): void;
    removeDirAsync(filepath: string): Promise<void>;
    rename(oldPath: string, newPath: string): void;
    renameAsync(oldPath: string, newPath: string): Promise<void>;
    protected lockFileSync(filepath: any): () => void;
    protected checkFileSync(filepath: any): boolean;
    protected unlockFileSync(filepath: any): void;
    getFileExtension(filepath: string): string | undefined;
    stripExtension(filepath: string): string;
    minifyAllJsonInDirRecursive(filepath: string): Promise<void>;
    minifyAllJsonInDirRecursiveAsync(filepath: string): Promise<void>;
    getFilesOfType(directory: string, fileType: string, files?: string[]): string[];
}
