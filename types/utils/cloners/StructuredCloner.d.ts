import type { ICloner } from "@spt-aki/utils/cloners/ICloner";
export declare class StructuredCloner implements ICloner {
    clone<T>(obj: T): T;
}
