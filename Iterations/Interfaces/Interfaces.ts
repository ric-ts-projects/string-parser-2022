export interface IIterable<T extends Object> {
    getElementAtIndex(piIndex: number): T;
    addElement(poElement: T): void;
}

export interface IIterator<T extends IIterable<U>, U> {
    setIterable(poIterable: T): void;
    getNext(): U;
}