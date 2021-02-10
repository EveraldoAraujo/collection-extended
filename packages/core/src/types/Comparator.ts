export type Comparator<T> = ((compare: T, predicate: T) => boolean) | Array<keyof T> | keyof T;
