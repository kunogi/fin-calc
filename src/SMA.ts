/**
 * 
 * @description Simple Moving Average
 * @param arr_ 
 * @param days_ 
 * @param weight_ 
 * @returns 
 */
export default function (arr_: number[], days_: number, weight_: number): number[] {
  let result: number[] = [arr_[0]];
  for (let i: number = 1, l: number = arr_.length; i < l; i++) {
    result.push((weight_ * arr_[i] + (days_ - weight_) * result[i - 1]) / days_);
  }
  return result;
}