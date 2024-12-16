import { ILogger } from "@spt/models/spt/utils/ILogger";
import { MathUtil } from "@spt/utils/MathUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
/**
 * Array of ProbabilityObjectArray which allow to randomly draw of the contained objects
 * based on the relative probability of each of its elements.
 * The probabilities of the contained element is not required to be normalized.
 *
 * Example:
 *   po = new ProbabilityObjectArray(
 *          new ProbabilityObject("a", 5),
 *          new ProbabilityObject("b", 1),
 *          new ProbabilityObject("c", 1)
 *   );
 *   res = po.draw(10000);
 *   // count the elements which should be distributed according to the relative probabilities
 *   res.filter(x => x==="b").reduce((sum, x) => sum + 1 , 0)
 */
export declare class ProbabilityObjectArray<K, V = undefined> extends Array<ProbabilityObject<K, V>> {
    private mathUtil;
    private cloner;
    constructor(mathUtil: MathUtil, cloner: ICloner, ...items: ProbabilityObject<K, V>[]);
    filter(callbackfn: (value: ProbabilityObject<K, V>, index: number, array: ProbabilityObject<K, V>[]) => any): ProbabilityObjectArray<K, V>;
    /**
     * Calculates the normalized cumulative probability of the ProbabilityObjectArray's elements normalized to 1
     * @param       {array}                         probValues              The relative probability values of which to calculate the normalized cumulative sum
     * @returns     {array}                                                 Cumulative Sum normalized to 1
     */
    cumulativeProbability(probValues: number[]): number[];
    /**
     * Clone this ProbabilitObjectArray
     * @returns     {ProbabilityObjectArray}                                Deep Copy of this ProbabilityObjectArray
     */
    clone(): ProbabilityObjectArray<K, V>;
    /**
     * Drop an element from the ProbabilityObjectArray
     *
     * @param       {string}                        key                     The key of the element to drop
     * @returns     {ProbabilityObjectArray}                                ProbabilityObjectArray without the dropped element
     */
    drop(key: K): ProbabilityObjectArray<K, V>;
    /**
     * Return the data field of a element of the ProbabilityObjectArray
     * @param       {string}                        key                     The key of the element whose data shall be retrieved
     * @returns     {object}                                                The data object
     */
    data(key: K): V | undefined;
    /**
     * Get the relative probability of an element by its key
     *
     * Example:
     *  po = new ProbabilityObjectArray(new ProbabilityObject("a", 5), new ProbabilityObject("b", 1))
     *  po.maxProbability() // returns 5
     *
     * @param       {string}                        key                     The key of the element whose relative probability shall be retrieved
     * @return      {number}                                                The relative probability
     */
    probability(key: K): number;
    /**
     * Get the maximum relative probability out of a ProbabilityObjectArray
     *
     * Example:
     *  po = new ProbabilityObjectArray(new ProbabilityObject("a", 5), new ProbabilityObject("b", 1))
     *  po.maxProbability() // returns 5
     *
     * @return      {number}                                                the maximum value of all relative probabilities in this ProbabilityObjectArray
     */
    maxProbability(): number;
    /**
     * Get the minimum relative probability out of a ProbabilityObjectArray
     *
     * Example:
     *  po = new ProbabilityObjectArray(new ProbabilityObject("a", 5), new ProbabilityObject("b", 1))
     *  po.minProbability() // returns 1
     *
     * @return      {number}                                                the minimum value of all relative probabilities in this ProbabilityObjectArray
     */
    minProbability(): number;
    /**
     * Draw random element of the ProbabilityObject N times to return an array of N keys.
     * Drawing can be with or without replacement
     * @param count The number of times we want to draw
     * @param replacement Draw with or without replacement from the input dict (true = dont remove after drawing)
     * @param locklist list keys which shall be replaced even if drawing without replacement
     * @returns Array consisting of N random keys for this ProbabilityObjectArray
     */
    draw(count?: number, replacement?: boolean, locklist?: Array<K>): K[];
}
/**
 * A ProbabilityObject which is use as an element to the ProbabilityObjectArray array
 * It contains a key, the relative probability as well as optional data.
 */
export declare class ProbabilityObject<K, V = undefined> {
    key: K;
    relativeProbability: number;
    data?: V;
    /**
     * Constructor for the ProbabilityObject
     * @param       {string}                        key                         The key of the element
     * @param       {number}                        relativeProbability         The relative probability of this element
     * @param       {any}                           data                        Optional data attached to the element
     */
    constructor(key: K, relativeProbability: number, data?: V);
}
export declare class RandomUtil {
    protected cloner: ICloner;
    protected logger: ILogger;
    constructor(cloner: ICloner, logger: ILogger);
    /**
     * The IEEE-754 standard for double-precision floating-point numbers limits the number of digits (including both
     * integer + fractional parts) to about 15–17 significant digits. 15 is a safe upper bound, so we'll use that.
     */
    private static readonly MAX_SIGNIFICANT_DIGITS;
    /**
     * Generates a secure random number between 0 (inclusive) and 1 (exclusive).
     *
     * This method uses the `crypto` module to generate a 48-bit random integer,
     * which is then divided by the maximum possible 48-bit integer value to
     * produce a floating-point number in the range [0, 1).
     *
     * @returns A secure random number between 0 (inclusive) and 1 (exclusive).
     */
    private getSecureRandomNumber;
    /**
     * Determines the number of decimal places in a number.
     *
     * @param num - The number to analyze.
     * @returns The number of decimal places, or 0 if none exist.
     * @remarks There is a mathematical way to determine this, but it's not as simple as it seams due to floating point
     *          precision issues. This method is a simple workaround that converts the number to a string and splits it.
     *          It's not the most efficient but it *is* the most reliable and easy to understand. Come at me.
     */
    private getNumberPrecision;
    /**
     * Generates a random integer between the specified minimum and maximum values, inclusive.
     *
     * @param min - The minimum value (inclusive).
     * @param max - The maximum value (inclusive).
     * @returns A random integer between the specified minimum and maximum values.
     */
    getInt(min: number, max: number): number;
    /**
     * Generates a random integer between 1 (inclusive) and the specified maximum value (exclusive).
     * If the maximum value is less than or equal to 1, it returns 1.
     *
     * @param max - The upper bound (exclusive) for the random integer generation.
     * @returns A random integer between 1 and max - 1, or 1 if max is less than or equal to 1.
     */
    getIntEx(max: number): number;
    /**
     * Generates a random floating-point number within the specified range.
     *
     * @param min - The minimum value of the range (inclusive).
     * @param max - The maximum value of the range (exclusive).
     * @returns A random floating-point number between `min` (inclusive) and `max` (exclusive).
     */
    getFloat(min: number, max: number): number;
    /**
     * Generates a random boolean value.
     *
     * @returns A random boolean value, where the probability of `true` and `false` is approximately equal.
     */
    getBool(): boolean;
    /**
     * Calculates the percentage of a given number and returns the result.
     *
     * @param percent - The percentage to calculate.
     * @param number - The number to calculate the percentage of.
     * @param toFixed - The number of decimal places to round the result to (default is 2).
     * @returns The calculated percentage of the given number, rounded to the specified number of decimal places.
     */
    getPercentOfValue(percent: number, number: number, toFixed?: number): number;
    /**
     * Reduces a given number by a specified percentage.
     *
     * @param number - The original number to be reduced.
     * @param percentage - The percentage by which to reduce the number.
     * @returns The reduced number after applying the percentage reduction.
     */
    reduceValueByPercent(number: number, percentage: number): number;
    /**
     * Determines if a random event occurs based on the given chance percentage.
     *
     * @param chancePercent - The percentage chance (0-100) that the event will occur.
     * @returns `true` if the event occurs, `false` otherwise.
     */
    getChance100(chancePercent: number): boolean;
    /**
     * Returns a random string from the provided array of strings.
     *
     * This method is separate from getArrayValue so we can use a generic inference with getArrayValue.
     *
     * @param arr - The array of strings to select a random value from.
     * @returns A randomly selected string from the array.
     */
    getStringArrayValue(arr: string[]): string;
    /**
     * Returns a random element from the provided array.
     *
     * @template T - The type of elements in the array.
     * @param arr - The array from which to select a random element.
     * @returns A random element from the array.
     */
    getArrayValue<T>(arr: T[]): T;
    /**
     * Retrieves a random key from the given object.
     *
     * @param node - The object from which to retrieve a key.
     * @returns A string representing one of the keys of the node object.
     *
     * TODO: v3.11 - This method is not type-safe and should be refactored to use a more specific type:
     *               https://github.com/sp-tarkov/server/pull/972/commits/f2b8efe211d95f71aec0a4bc84f4542335433412
     */
    getKey(node: any): string;
    /**
     * Retrieves the value associated with a key from the given node object.
     *
     * @param node - An object with string keys and any type of values.
     * @returns The value associated with the key obtained from the node.
     *
     * TODO: v3.11 - This method is not type-safe and should be refactored to use a more specific type:
     *               https://github.com/sp-tarkov/server/pull/972/commits/f2b8efe211d95f71aec0a4bc84f4542335433412
     */
    getKeyValue(node: {
        [x: string]: any;
    }): any;
    /**
     * Generates a normally distributed random number using the Box-Muller transform.
     *
     * @param mean - The mean (μ) of the normal distribution.
     * @param sigma - The standard deviation (σ) of the normal distribution.
     * @param attempt - The current attempt count to generate a valid number (default is 0).
     * @returns A normally distributed random number.
     *
     * @remarks
     * This function uses the Box-Muller transform to generate a normally distributed random number.
     * If the generated number is less than 0, it will recursively attempt to generate a valid number up to 100 times.
     * If it fails to generate a valid number after 100 attempts, it will return a random float between 0.01 and twice the mean.
     */
    getNormallyDistributedRandomNumber(mean: number, sigma: number, attempt?: number): number;
    /**
     * Generates a random integer between the specified range.
     * Low and high parameters are floored to integers.
     *
     * TODO: v3.11 - This method should not accept non-integer numbers.
     *
     * @param low - The lower bound of the range (inclusive).
     * @param high - The upper bound of the range (exclusive). If not provided, the range will be from 0 to `low`.
     * @returns A random integer within the specified range.
     */
    randInt(low: number, high?: number): number;
    /**
     * Generates a random number between two given values with optional precision.
     *
     * @param value1 - The first value to determine the range.
     * @param value2 - The second value to determine the range. If not provided, 0 is used.
     * @param precision - The number of decimal places to round the result to. Must be a positive integer between 0
     *                    and MAX_PRECISION, inclusive. If not provided, precision is determined by the input values.
     * @returns A random floating-point number between `value1` and `value2` (inclusive) with the specified precision.
     * @throws Will throw an error if `precision` is not a positive integer, if `value1` or `value2` are not finite
     *         numbers, or if the precision exceeds the maximum allowed for the given values.
     */
    randNum(value1: number, value2?: number, precision?: number | null): number;
    /**
     * Draws a specified number of random elements from a given list.
     *
     * @template T - The type of elements in the list.
     * @param originalList - The list to draw elements from.
     * @param count - The number of elements to draw. Defaults to 1.
     * @param replacement - Whether to draw with replacement. Defaults to true.
     * @returns An array containing the drawn elements.
     */
    drawRandomFromList<T>(originalList: Array<T>, count?: number, replacement?: boolean): Array<T>;
    /**
     * Draws a specified number of random keys from a given dictionary.
     *
     * @param dict - The dictionary from which to draw keys.
     * @param count - The number of keys to draw. Defaults to 1.
     * @param replacement - Whether to draw with replacement. Defaults to true.
     * @returns An array of randomly drawn keys from the dictionary.
     *
     * TODO: v3.11 - This method is not type-safe and should be refactored to use a more specific type:
     *               https://github.com/sp-tarkov/server/pull/972/commits/f2b8efe211d95f71aec0a4bc84f4542335433412
     */
    drawRandomFromDict(dict: any, count?: number, replacement?: boolean): any[];
    /**
     * Generates a biased random number within a specified range.
     *
     * @param min - The minimum value of the range (inclusive).
     * @param max - The maximum value of the range (inclusive).
     * @param shift - The bias shift to apply to the random number generation.
     * @param n - The number of iterations to use for generating a Gaussian random number.
     * @returns A biased random number within the specified range.
     * @throws Will throw if `max` is less than `min` or if `n` is less than 1.
     */
    getBiasedRandomNumber(min: number, max: number, shift: number, n: number): number;
    /**
     * Shuffles an array in place using the Fisher-Yates algorithm.
     *
     * @template T - The type of elements in the array.
     * @param array - The array to shuffle.
     * @returns The shuffled array.
     */
    shuffle<T>(array: Array<T>): Array<T>;
    /**
     * Rolls for a chance probability and returns whether the roll is successful.
     *
     * @param probabilityChance - The probability chance to roll for, represented as a number between 0 and 1.
     * @returns `true` if the random number is less than or equal to the probability chance, otherwise `false`.
     */
    rollForChanceProbability(probabilityChance: number): boolean;
}
