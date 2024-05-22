import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class RecursiveCloner implements ICloner {
    private static primitives;
    clone<T>(obj: T): T;
}
