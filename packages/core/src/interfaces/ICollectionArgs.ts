import { Comparator } from "../types";

export interface ICollectionArgs<T>{
    startWith?: Array<T>,
    comparator?: Comparator<T>;
}