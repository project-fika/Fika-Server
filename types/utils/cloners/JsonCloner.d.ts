import type { ICloner } from "@spt-aki/utils/cloners/ICloner";
export declare class JsonCloner implements ICloner {
    clone<T>(obj: T): T;
}
