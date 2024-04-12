import { expectType } from "tsd";

// IMPLEMENT THIS TYPE
export type WrapForPenpal<T> = {
  [K in keyof T]: T[K] extends { (...arg: infer Args): infer R }
  ? R extends Promise<any>
    ? R // R is already a proise ,
    : (...arg: Args) => Promise<R>
  : T[K] // not method things
};

/**
 * Test Scenario - Do not change anything below this line
 */
const methods = {
  add(a: number, b: number): number {
    return a + b;
  },
  subtract(a: number, b: number): number {
    return a - b;
  },
};
const asyncMethods: WrapForPenpal<typeof methods> = {} as any;

let addPromise = asyncMethods.add(1, 2);
expectType<Promise<number>>(addPromise);
// @ts-expect-error
expectType<typeof addPromise>("this should fail");

let subtractPromise = asyncMethods.subtract(1, 2);
expectType<Promise<number>>(subtractPromise);
// @ts-expect-error
expectType<typeof subtractPromise>("this should fail");
