class FinMath {

  /**
   * 
   * @function MA
   * @description calculate moving average
   * @param {number[]} arr_ original data array
   * @param {number} days_ days
   * @param {boolean} calcAnyDays_ calculate or not based on not enough days
   * @returns {number[]} moving average array
   */
  public ma(arr_: number[], days_: number, calcAnyDays_: boolean = true): (number | null)[] {
    let result: (number | null)[] = [];
    for (let i: number = 0, sum: number = 0, ma: number | null, l: number = arr_.length; i < l; i++) {
      //add new incoming value to sum:
      arr_[i] && (sum += arr_[i]);
      if (i >= days_ - 1) {
        ma = sum / days_;
        //remove the oldest value from sum, to keep the total count
        arr_[i - days_ + 1] && (sum -= arr_[i - days_ + 1]);
      } else {
        //not enough days:
        ma = calcAnyDays_ ? sum / (i + 1) : null;
      }
      result.push(ma);
    }
    return result;
  }

  /**
   * 
   * @function EMA
   * @description calculate exponential moving average
   * @param arr_ original data array
   * @param days_ days
   * @returns 
   */
  public ema(arr_: number[], days_: number): number[] {
    let result: number[] = [arr_[0]];
    for (let i: number = 1, l: number = arr_.length; i < l; i++) {
      result.push((2 * arr_[i] + (days_ - 1) * result[i - 1]) / (days_ + 1));
    }
    return result;
  }

  /**
   * 
   * @description Simple Moving Average
   * @param arr_ 
   * @param days_ 
   * @param weight_ 
   * @returns 
   */
  public sma(arr_: number[], days_: number, weight_: number): number[] {
    let result: number[] = [arr_[0]];
    for (let i: number = 1, l: number = arr_.length; i < l; i++) {
      result.push((weight_ * arr_[i] + (days_ - weight_) * result[i - 1]) / days_);
    }
    return result;
  }

  /**
   * 
   * @param arr_ 
   * @param prop_ 
   * @param f_ 
   * @returns 
   */
  private genArrByProp(arr_: any[], prop_: string, f_?: Function) {
    if (prop_) {
      let result = [];
      for (let i: number = 0, l: number = arr_.length; i < l; i++) {
        result.push(f_ ? f_(arr_[i][prop_]) : arr_[i][prop_]);
      }
      return result;
    } else {
      return arr_;
    }
  }
}

export default new FinMath();
