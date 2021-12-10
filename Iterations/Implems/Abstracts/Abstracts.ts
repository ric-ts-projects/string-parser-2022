import { IIterator, IIterable } from "./../../Interfaces/Interfaces"


export abstract class AIterable<T> implements IIterable<T> {
    private _aElements: Array<T>;

    constructor() {
        this._clear();            
    }

    getElementAtIndex(piIndex: number): T {
        this._checkIndexValididty(piIndex);
        const oElement: T = this._aElements[piIndex];
        return(oElement);
    }

    addElement(poElement: T): void {
        this._aElements.push(poElement);
    }

    private _checkIndexValididty(piIndex: number) {
        const bOk = (piIndex>=0 && piIndex<=this._aElements.length);
        if (!bOk) {
            //.....
        }
    }
    private _clear() {
        this._aElements = [];
    }
}

export abstract class AIterator<T extends IIterable<U>, U extends Object> implements IIterator<T, U> {

    private _oIterable: T;
    private _iCurrentIndex: number;

    constructor(poIterable?: T) {
        if (poIterable) {
            this.setIterable(poIterable);
        }            
        this._iCurrentIndex = -1;
    }

    setIterable(poIterable: T): void {
        this._oIterable = poIterable;
    }

    getNext(): U {
        this._incrementIndex();
        let oElement: U = null;
        //if (!this._is) {
            oElement = this._oIterable.getElementAtIndex(this._iCurrentIndex);
        //}            
        return(oElement);
    }
    private _incrementIndex() {
        this._iCurrentIndex++;
    }
}