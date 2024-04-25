export declare class Queue<T> {
    private list;
    get length(): number;
    constructor();
    /**
     * Adds an element to the end of the queue.
     */
    enqueue(element: T): void;
    /**
     * Iterates over the elements received and adds each one to the end of the queue.
     */
    enqueueAll(elements: T[]): void;
    /**
     * Removes the first element from the queue and returns it's value. If the queue is empty, undefined is returned and the queue is not modified.
     */
    dequeue(): T;
    /**
     * Returns the first element's value.
     */
    peek(): T;
}
