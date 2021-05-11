/**
 * 
 * @function EMA
 * @description calculate exponential moving average
 * @param arr_ original data array
 * @param days_ days
 * @returns 
 */
export default function (arr_: number | number[], days_: number): number[] {
  if (typeof (arr_) === "number") arr_ = [arr_];
  let result: number[] = [arr_[0]];
  for (let i: number = 1, l: number = arr_.length; i < l; i++) {
    result.push((2 * arr_[i] + (days_ - 1) * result[i - 1]) / (days_ + 1));
  }
  return result;
}