import { IIterator, IIterable, AIterator, AIterable } from "./Iterations";




//============================================================

interface IBlockType {
    iId: number;
    //oDelimitersPairs: IDelimitersPairs;
    oStartDelimiter: IStartDelimiter;

}

class BlockType implements IBlockType {
    iId: number;
    //oDelimitersPairs: IDelimitersPairs;
    oStartDelimiter: IStartDelimiter;    
}
interface IBlockTypes extends IIterable<IBlockType> {
}
class BlockTypes extends AIterable<IBlockType> implements IBlockTypes {
}




interface IIterator_BlockTypes extends IIterator<IIterable<IBlockType>, IBlockType> {}

class Iterator_BlockTypes extends AIterator<IIterable<IBlockType>, IBlockType> implements IIterator<IIterable<IBlockType>, IBlockType> {
}







class Iterator_Records extends AIterator<IRecords, IRecord> implements IIterator<IRecords, IRecord> {
    

}

type StringOrFunction = string | Function;
type StringOrNull = string | null;

interface IDelimiter {
    getMatchingPartWith(psText: string): StringOrNull;
}    
interface IStartDelimiter extends IDelimiter {
    iId: number;
    addPossibleEndDelimiter(poEndDelimiter: IEndDelimiter);
}
interface IEndDelimiter extends IDelimiter {
    iId: number;
}

enum DelimitersType {
    simple = 1,
    regExp = 2,
    func = 3
}

abstract class ADelimiter {
    iId: number;
    iId_DelimiterType: DelimitersType;
    pValue: StringOrFunction;

    getMatchingPartWith(psText: string): StringOrNull {
        let retour = null;

        if (this.iId_DelimiterType === DelimitersType.simple) {
            if ( psText.substr(0,this.pValue.length) === this.pValue ) {
                retour = this.pValue;
            }

        } else if (this.iId_DelimiterType === DelimitersType.regExp) {
            let sRegExpOptions: string = "";
            sRegExpOptions = (sRegExpOptions === "")? "" : `/(${sRegExpOptions})`;            
            const sRegExpString: string = this.pValue+"";
            const oRegExp: RegExp = new RegExp(`^${sRegExpString}`, sRegExpOptions);

            const aMatchingResults: Array<string> = psText.match(oRegExp);
    
            const bMatching: boolean = (aMatchingResults !== null) /*&& (aMatchingResults[0].length>0)*/;
            retour = (bMatching)? aMatchingResults[0] : null;
    

        } else if (this.iId_DelimiterType === DelimitersType.func) {
            if (typeof(this.pValue) === "function") {
                retour = this.pValue(psText);
            }

        }

        return(retour);
    }    
}

class StartDelimiter extends ADelimiter implements IStartDelimiter {

    aPossibleEndDelimiters: Array<IEndDelimiter>;

    constructor() {
        super();
        this.aPossibleEndDelimiters = [];
    }

    addPossibleEndDelimiter(poEndDelimiter: IEndDelimiter): void {
        this.aPossibleEndDelimiters.push(poEndDelimiter);    
    }
}

class EndDelimiter implements IEndDelimiter {
    iId: number;
    pValue: StringOrFunction;
    getMatchingPartWith(psText: string): StringOrNull {
        return(null);
    }
}

/*interface IDelimitersPair {
    oStartDelimiter: IStartDelimiter;
    oEndDelimiter: IEndDelimiter;
}
interface IDelimitersPairs extends IIterable<IDelimitersPair> {}
interface IIterator_DelimitersPairs extends IIterator<IDelimitersPairs, IDelimitersPair> {
}

class Iterator_DelimitersPairs extends AIterator<IDelimitersPairs, IDelimitersPair> implements IIterator<IDelimitersPairs, IDelimitersPair> {
}
*/

class Factory_BlockTypes {
    getSingleton(piId_BlockType: number): IBlockType {
        return(null);
    }
}
class Factory_StartDelimiters {
    getSingleton(piId_DelimiterType: number, pDelimiterValue: StringOrFunction): IStartDelimiter {
        return(null);
    }
}
class Factory_EndDelimiters {
    getSingleton(piId_DelimiterType: number, pDelimiterValue: StringOrFunction): IEndDelimiter {
        return(null);
    }
}
/*class Factory_DelimitersPairs {
    getSingleton(poStartDelimiter: IStartDelimiter, poEndDelimiter: IEndDelimiter): IDelimitersPair {
        return(null);
    }
}*/



interface IRecord {
    iId_BlockType: number;

    iId_StartDelimiter: number;
    iId_StartDelimiterType: number;
    startDelimiterValue: StringOrFunction;

    iId_EndDelimiter: number;
    iId_EndDelimiterType: number;
    endDelimiterValue: StringOrFunction;    
}
interface IRecords extends IIterable<IRecord> {
    toBlockTypes(poIterator_Records: IIterator_Records): IBlockTypes;
}

interface IIterator_Records extends IIterator<IRecords, IRecord> {

}





class Records implements IRecords {
    
    Records() {
    }
    
    addElement(poElement: IRecord): void {
    }

    getElementAtIndex(piIndex: number): IRecord {
        return(null);
    }

    toBlockTypes(poIterator_Records: IIterator_Records): IBlockTypes {

        let oFactory_BlockTypes: Factory_BlockTypes;
        let oFactory_StartDelimiters: Factory_StartDelimiters;
        let oFactory_EndDelimiters: Factory_EndDelimiters;
        //let oFactory_DelimitersPairs: Factory_DelimitersPairs;

        let oBlockTypes: IBlockTypes;

        let oRecord: IRecord;
        let iId_BlockType: number, oBlockType: IBlockType;
        let iId_StartDelimiter: number, oStartDelimiter: IStartDelimiter;
        let iId_EndDelimiter: number, oEndDelimiter: IEndDelimiter;
        //let oDelimitersPair: IDelimitersPair;
        while(oRecord = poIterator_Records.getNext()) {
            iId_BlockType = oRecord.iId_BlockType;
            oBlockType = oFactory_BlockTypes.getSingleton(iId_BlockType);
            while(oRecord.iId_BlockType === iId_BlockType) {
                iId_StartDelimiter = oRecord.iId_StartDelimiter;
                oStartDelimiter = oFactory_StartDelimiters.getSingleton(
                    oRecord.iId_StartDelimiterType,
                    oRecord.startDelimiterValue
                );
                while(oRecord.iId_StartDelimiter === iId_StartDelimiter) {
                    iId_EndDelimiter = oRecord.iId_EndDelimiter;
                    oEndDelimiter = oFactory_EndDelimiters.getSingleton(
                        oRecord.iId_EndDelimiterType,
                        oRecord.endDelimiterValue
                    );
                    oStartDelimiter.addPossibleEndDelimiter(oEndDelimiter);

                    //oDelimitersPair = oFactory_DelimitersPairs.getSingleton(oStartDelimiter, oEndDelimiter);
                    //oBlockType.oDelimitersPairs.addElement(oDelimitersPair);                    
                }
            }

            oBlockTypes.addElement(oBlockType);

        }

        return(oBlockTypes);
    }        

}    



// EXPLOITATION des oBlockTypes (d'un langage donné donc)
/*
interface IBlockType {
    iId: number;
    oDelimitersPairs: IDelimitersPairs

}
interface IBlockTypes {
    addBlockType(poBlockType: IBlockType);
}
*/

let oRecords: Records = new Records();
let oIterator_Records: IIterator_Records = new Iterator_Records(oRecords);

let oBlockTypes: IBlockTypes = oRecords.toBlockTypes(oIterator_Records);
let oIterator_BlockTypes: IIterator_BlockTypes = new Iterator_BlockTypes(oBlockTypes);
let oBlockType: IBlockType;


/*let oIterator_DelimitersPairs: Iterator_DelimitersPairs = new Iterator_DelimitersPairs();
let oDelimitersPair: IDelimitersPair;
*/

let sRemaingText: string;
let sCurrentNonBlockElement: string = "";
let sMatchingPart: StringOrNull, iMatchingLength: number;

let oBuilder_ElementsStructure: Object;
let bTextWalkFinished: boolean = false;
while(!bTextWalkFinished) {
    oBlockType = oIterator_BlockTypes.getNext();
    //oIterator_DelimitersPairs.setIterable(oBlockType.oDelimitersPairs);
    oBlockType.
    while(!bTextWalkFinished && (oDelimitersPair = oIterator_DelimitersPairs.getNext())) {
        
        sMatchingPart = oDelimitersPair.oEndDelimiter.getMatchingPartWith(sRemaingText);
        if (sMatchingPart !== null) {
            iMatchingLength = sMatchingPart.length;
            oBuilder_ElementsStructure.setCurrentBlockElementEnd();
        } else {

            sMatchingPart = oDelimitersPair.oStartDelimiter.getMatchingPartWith(sRemaingText);
            if (sMatchingPart !== null) {
                iMatchingLength = sMatchingPart.length;
                if (sCurrentNonBlockElement.length) {
                    oBuilder_ElementsStructure.addNonBlockElement(sCurrentNonBlockElement);
                    sCurrentNonBlockElement = "";
                }
                oBuilder_ElementsStructure.addBlockElement(oBlockType.iId, oDelimitersPair);

            } else {
                sCurrentNonBlockElement += sRemaingText.substr(0,1);
                bTextWalkFinished = (sRemaingText.length <= 1);
                if (!bTextWalkFinished) {
                    sRemaingText = sRemaingText.substr(1);
                } else {
                    //...
                }
            }        

        }
    }

}




