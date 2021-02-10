import { Comparator } from "./Comparator";

export type FnEquals<T> = (a: T, b:T, comparator?: Comparator<T> ) => boolean;