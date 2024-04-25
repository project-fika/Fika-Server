export declare class LinkedList<T> {
    private head?;
    private tail?;
    private _length;
    get length(): number;
    private set length(value);
    constructor();
    /**
     * Adds an element to the start of the list.
     */
    prepend(value: T): void;
    /**
     * Adds an element at the given index to the list.
     */
    insertAt(value: T, idx: number): void;
    /**
     * Adds an element to the end of the list.
     */
    append(value: T): void;
    /**
     * Returns the first element's value.
     */
    getHead(): T;
    /**
     * Finds the element from the list at the given index and returns it's value.
     */
    get(idx: number): T;
    /**
     * Returns the last element's value.
     */
    getTail(): T;
    /**
     * Finds and removes the first element from a list that has a value equal to the given value, returns it's value if it successfully removed it.
     */
    remove(value: T): T;
    /**
     * Removes the first element from the list and returns it's value. If the list is empty, undefined is returned and the list is not modified.
     */
    shift(): T;
    /**
     * Removes the element from the list at the given index and returns it's value.
     */
    removeAt(idx: number): T;
    /**
     * Removes the last element from the list and returns it's value. If the list is empty, undefined is returned and the list is not modified.
     */
    pop(): T;
    /**
     * Returns an iterable of index, value pairs for every entry in the list.
     */
    entries(): IterableIterator<[number, T]>;
    /**
     * Returns an iterable of values in the list.
     */
    values(): IterableIterator<T>;
}
