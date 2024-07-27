import { RandomUtil } from "@spt/utils/RandomUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class ExhaustableArray<T> implements IExhaustableArray<T> {
    private itemPool;
    private randomUtil;
    private cloner;
    private pool;
    constructor(itemPool: T[], randomUtil: RandomUtil, cloner: ICloner);
    getRandomValue(): T | undefined;
    getFirstValue(): T | undefined;
    hasValues(): boolean;
}
export interface IExhaustableArray<T> {
    getRandomValue(): T | undefined;
    getFirstValue(): T | undefined;
    hasValues(): boolean;
}
