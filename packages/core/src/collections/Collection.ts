import { ICollectionArgs } from "../interfaces";
import { Comparator, FnEquals } from "../types";

export class Collection<T> {
    private thisArray: Array<T> = [];
    private comparator: Comparator<T>;
    
    constructor(
        args?: ICollectionArgs<T>, 
        ) {
        this.thisArray= args?.startWith || [], 
        this.comparator = args?.comparator
    }

    setComparator(comparator?: Comparator<T>){
        this.comparator = comparator;
    }

    //#region data
    copy(): Collection<T> {
        return new Collection<T>({startWith: this.thisArray.slice(), comparator: this.comparator});
    }

    static fromArray<T>(array: Array<T>): Collection<T>{
        return new Collection({startWith: array});
    }

    toArray(): Array<T>{
        return this.thisArray.slice();
    }
    //#endregion

    //#region iterators
    forEach( fn: (value: T, index?: number, collection?: T[], equals?: FnEquals<T>) => void, thisArgs?:any){
        const fnEquals: FnEquals<T> = this.makeEqualsFunction();
        this.thisArray.forEach((i:T, index:number, array: T[])=> fn(i, index, array, fnEquals), thisArgs)
    }

    async forEachAsync( fn: (value: T, index?: number, collection?: T[], equals?: (a: T, b:T, comparator?: Comparator<T> ) => boolean) => Promise<void>, thisArgs?:any){
        const fnEquals: FnEquals<T> = this.makeEqualsFunction();

        for (let i = 0; i < this.thisArray.length; i++) {
            const element = this.thisArray[i];
            await fn(element, i, this.thisArray, fnEquals);
        }
    }
    //#endregion

    //#region content
    add(item: T){
        this.thisArray.push(item);
    }

    remove(item: T){
       this.thisArray.splice( this.index(item) , 1);
    }

    replace(replace: T, withThis: T){       
        this.thisArray.splice(this.index(replace) , 1, ...[withThis]);
    }

    merge(collection: Array<T>|Collection<T>):void{
        if(Array.isArray(collection))
            this.thisArray =  this.thisArray.concat(collection);
        else
            this.thisArray = this.thisArray.concat(collection.thisArray);
    }
    //#endregion

    // #region Math Sets
    isEmpty():boolean{
        return !!this.thisArray.length
    }

    isUnitary():boolean{
        return this.thisArray.length === 1
    }

    // #endregion

    // #region by comparator
    contains(item: T): boolean {
        return this.index(item) >=0;
    }

    // by ref
    have(item: T): boolean {
        return this.thisArray.indexOf(item)>=0
    }

    // #endregion

    // #region position
    first(): T {
        return this.thisArray[0];
    }

    last(): T {
        return this.thisArray[this.thisArray.length-1];
    }

    index(a: T): number {
        return this.thisArray.findIndex(i=> this.equals(a, i))
    }

    // #endregion

    private equals(a: T, b:T, comparator?: Comparator<T> ): boolean {          
        comparator = comparator || this.comparator;
        if(typeof comparator === 'function') return comparator(a, b);
        if(!Array.isArray(comparator))  return a[comparator] === b[comparator];
        if(Array.isArray(comparator)) return comparator.every(i => a[i] === b[i]);
        return a===b;
    }

    private makeEqualsFunction(): FnEquals<T> {
        let fnEquals: (a: T, b:T, comparator?: Comparator<T> ) => boolean;

        fnEquals = (a: T, b:T): boolean =>{          
            const comparator = this.comparator;
            if(typeof comparator === 'function') return comparator(a, b);
            if(!Array.isArray(comparator))  return a[comparator] === b[comparator];
            if(Array.isArray(comparator)) return comparator.every(i => a[i] === b[i]);
            return a===b;
        };

       return fnEquals;
    }
}