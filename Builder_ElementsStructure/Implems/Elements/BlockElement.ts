import { AElement } from "./AElement";

export class BlockElement extends AElement {
    private _aChildren: Array<AElement>;

    constructor() {
        super();

        this._aChildren = [];
    }

    addChildElement(poElement: AElement): void {
        this._aChildren.push(poElement);
    }
}