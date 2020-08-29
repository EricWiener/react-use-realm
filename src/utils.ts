export function flattenArrayOfArrays(arrayOfArrays: any[][]) {
  return arrayOfArrays.reduce((acc: any[], val: any) => acc.concat(val), []);
}

/**
 * Delay execution by an amount of time
 * @param ms - amount to delay in milliseconds
 * @example
 * await delay(5000);
 * console.log("Waited 5s");
 */
export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));
