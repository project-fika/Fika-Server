export declare class MathUtil {
    /**
     * Helper to create the sum of all array elements
     * @param   {array}     values          The array with numbers of which to calculate the sum
     * @return  {number}                    sum(values)
     */
    arraySum(values: number[]): number;
    /**
     * Helper to create the cumulative sum of all array elements
     * arrayCumsum([1, 2, 3, 4]) = [1, 3, 6, 10]
     * @param   {array}     values          The array with numbers of which to calculate the cumulative sum
     * @return  {array}                     cumsum(values)
     */
    arrayCumsum(values: number[]): number[];
    /**
     * Helper to create the product of each element times factor
     * @param   {array}     values          The array of numbers which shall be multiplied by the factor
     * @return  {array}                     array times factor
     */
    arrayProd(values: number[], factor: number): number[];
    /**
     * Helper to add a constant to all array elements
     * @param   {array}     values          The array of numbers to which the summand should be added
     * @return  {array}                     array plus summand
     */
    arrayAdd(values: number[], summand: number): number[];
    /**
     * Map a value from an input range to an output range linearly
     *
     * Example:
     *  a_min = 0; a_max=1;
     *  b_min = 1; b_max=3;
     *  MathUtil.mapToRange(0.5, a_min, a_max, b_min, b_max) // returns 2
     *
     * @param   {number}    x               The value from input range to be mapped to output range
     * @param   {number}    minIn           min of input range
     * @param   {number}    maxIn           max of input range
     * @param   {number}    minOut          min of output range
     * @param   {number}    maxOut          max of outout range
     * @return  {number}                    the result of the mapping
     */
    mapToRange(x: number, minIn: number, maxIn: number, minOut: number, maxOut: number): number;
    /**
     * Linear interpolation
     * e.g. used to do a continuous integration for quest rewards which are defined for specific support centers of pmcLevel
     *
     * @param   {string}    xp              the point of x at which to interpolate
     * @param   {array}     x               support points in x (of same length as y)
     * @param   {array}     y               support points in y (of same length as x)
     * @return  {number}                    y(xp)
     */
    interp1(xp: number, x: number[], y: number[]): number;
}
