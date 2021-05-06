class FinMath {

  /**
   * 
   * @description calc average
   * @param arr_ 
   * @returns 
   */
  public avg(arr_: number[]): number {
    let sum: number = 0;
    let l: number = arr_.length;
    for (let i: number = l; i--;) {
      sum += arr_[i];
    }
    return sum / l;
  }

  public op(op_: string, s_: number, m_: number): number {
    switch (op_) {
      case '+': return s_ + m_;
      case '-': return s_ - m_;
      case '*': return s_ * m_;
      case '/': return m_ ? s_ / m_ : NaN;
    }
    return NaN;
  }

  public arrOp(arr1_: any, arr2_: any, op_: string) {
    let result: number[] = [], i: number, len1: number = arr1_.length, len2: number;
    switch (this.getClass(arr2_)) {
      case 'Array':
        len2 = arr2_.length;
        for (i = 0; i < len1; i++) {
          if (this.getClass(arr1_[i]) == 'Number' && this.getClass(arr2_[i]) == 'Number') {
            result.push(this.op(op_, arr1_[i], arr2_[i]));
          } else {
            result.push(NaN);
          }
        }

        while (result.length < len2) {
          result.push(NaN);
        }
        break;

      case 'Number':
        for (i = 0; i < len1; i++) {
          if (this.getClass(arr1_[i]) == 'Number') {
            result.push(this.op(op_, arr1_[i], arr2_));
          } else {
            result.push(NaN);
          }
        }
        break;

      default:
        throw Error('argument of arrOp() is not supported');
    }

    return result;
  }

  /**
   * @description calculate standard deviation
   * @param arr_ 
   * @param n_ 
   * @returns 
   */
  public sd(arr_: number[], n_: number): number {
    let avg: number = this.avg(arr_);
    let l: number = arr_.length;
    let sum: number = 0;
    for (let i: number = l; i--;) {
      sum += Math.pow(arr_[i] - avg, 2);
    }
    return Math.sqrt(sum / (n_ ? l - n_ : l));
  }

  /**
   * 
   * @description 
   * @param arr_ 
   * @param n_ 
   * @returns 
   */
  public std(arr_: number[], n_: number): number[] {
    let result: number[] = [];
    for (let i: number = 0, s: number, l: number = arr_.length; i < l; i++) {
      s = i < n_ ? 0 : i - n_ + 1;
      result.push(this.sd(arr_.slice(s, i + 1), 1));
    }
    return result;
  }

  /**
   * 
   * @description calc absolute deviation
   * @link https://baike.baidu.com/item/%E7%BB%9D%E5%AF%B9%E5%81%8F%E5%B7%AE/5805166
   * @param arr_ 
   * @returns 
   */
  public ad(arr_: number[]): number {
    let avg: number = this.avg(arr_);
    let sum: number = 0;
    let l: number = arr_.length;
    for (var i = l; i--;) {
      sum += Math.abs(arr_[i] - avg);
    }
    return sum / l;
  }

  /**
   * 
   * @param arr_ 
   * @param n_ 
   * @returns 
   */
  public avedev(arr_: number[], n_: number): number[] {
    let result: number[] = [];
    for (let i: number = 0, s: number, l: number = arr_.length; i < l; i++) {
      s = i < n_ ? 0 : i - n_ + 1;
      result.push(this.ad(arr_.slice(s, i + 1)));
    }
    return result;
  }

  /**
   * 
   * @param arr_ 
   * @param n_ 
   * @returns 
   */
  public hhv(arr_: number[], n_: number): number[] {
    let result: number[] = [];
    let l: number = arr_.length;
    let max: number = Math.max(...arr_);
    for (let i: number = 0, s: number; i < l; i++) {
      if (n_) {
        s = i < n_ ? 0 : i - n_ + 1;
        result.push(Math.max(...arr_.slice(s, i + 1)));
      } else {
        result.push(max);
      }
    }
    return result;
  }

  /**
   * 
   * @param arr_ 
   * @param n_ 
   * @returns 
   */
  public llv(arr_: number[], n_: number): number[] {
    let result: number[] = [];
    let l: number = arr_.length;
    let min: number = Math.min(...arr_);
    for (let i: number = 0, s: number; i < l; i++) {
      if (n_) {
        s = i < n_ ? 0 : i - n_ + 1;
        result.push(Math.min(...arr_.slice(s, i + 1)));
      } else {
        result.push(min);
      }
    }
    return result;
  }

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
   * @param n_ 
   * @param step_ 
   * @param max_ 
   * @returns 
   */
  public sar(arr_: any[], n_: number, step_: number, max_: number): { data: number[], direction: number[] } {
    let highArr: number[] = this.genArrByProp(arr_, 'high'),
      lowArr: number[] = this.genArrByProp(arr_, 'low'),
      len: number = arr_.length,
      result: number[] = [],
      stepArr: number[] = [],
      extremeArr: number[] = [],
      directionArr: number[] = [];

    function up(l: number): void {
      if (l < len) {
        result[l] = Math.min(...lowArr.slice(l - n_, l));
        directionArr[l] = 1;
        if (result[l] > lowArr[l]) {
          down(l + 1);
        } else {
          extremeArr[l] = Math.max.apply(null, highArr.slice(l - n_ + 1, l + 1));
          for (stepArr[l] = step_; len - 1 > l;) {
            result[l + 1] = result[l] + stepArr[l] * (extremeArr[l] - result[l]) / 100;
            directionArr[l + 1] = 1;
            if (result[l + 1] > lowArr[l + 1]) {
              return down(l + 2);
            }
            extremeArr[l + 1] = Math.max(...highArr.slice(l - n_ + 2, l + 2));
            if (highArr[l + 1] > extremeArr[l]) {
              stepArr[l + 1] = stepArr[l] + step_;
              stepArr[l + 1] > max_ && (stepArr[l + 1] = max_);
            } else {
              stepArr[l + 1] = stepArr[l];
            }
            l++;
          }
        }
      }
    }
    function down(l: number): void {
      if (l < len) {
        result[l] = Math.max(...highArr.slice(l - n_, l));
        directionArr[l] = 0;
        if (result[l] < highArr[l]) {
          return up(l + 1);
        }
        extremeArr[l] = Math.min(...lowArr.slice(l - n_ + 1, l + 1));
        for (stepArr[l] = step_; len - 1 > l;) {
          result[l + 1] = result[l] + stepArr[l] * (extremeArr[l] - result[l]) / 100;
          directionArr[l + 1] = 0;
          if (result[l + 1] < highArr[l + 1]) {
            return up(l + 2);
          }
          extremeArr[l + 1] = Math.min(...lowArr.slice(l - n_ + 2, l + 2));
          if (lowArr[l + 1] < extremeArr[l]) {
            stepArr[l + 1] = stepArr[l] + step_;
            stepArr[l + 1] > max_ && (stepArr[l + 1] = max_);
          } else {
            stepArr[l + 1] = stepArr[l];
          }
          l++;
        }
      }
    }

    highArr[n_] > highArr[0] || lowArr[n_] > lowArr[0] ? up(n_) : down(n_);

    return {
      data: result,
      direction: directionArr
    };
  }

  public abs(o_: any) {
    switch (this.getClass(o_)) {
      case 'Number':
        return Math.abs(o_);

      case 'Array':
        let result: number[] = [];
        for (let i: number = 0, l: number = o_.length; i < l; i++) {
          result.push(Math.abs(o_[i]));
        }
        return result;

      default:
        throw new Error('argument of abs() is not supported');
    }
  }

  public sum(arr_: number[], n_: number): number[] {
    let result: number[] = [];
    if (n_) {
      for (let i: number = 0, s: number, l: number = arr_.length; i < l; i++) {
        s = i < n_ ? 0 : i - n_ + 1;
        result.push(this.getArrSum(arr_.slice(s, i + 1)));
      }
    } else {
      let last: number = 0;
      for (let i: number = 0, l: number = arr_.length; i < l; i++) {
        last += arr_[i];
        result.push(last);
      }
    }
    return result;
  }

  public max(arr1_: any, arr2_: any): number | number[] {
    let result: number[], i: number, l: number;
    switch (this.getClass(arr1_)) {
      case 'Array':
        switch (this.getClass(arr2_)) {
          case 'Array':
            result = [];
            for (i = 0, l = arr1_.length; i < l; i++) {
              result.push(Math.max(arr1_[i], arr2_[i]));
            }
            return result;

          case 'Number':
            result = [];
            for (i = 0, l = arr1_.length; i < l; i++) {
              result.push(Math.max(arr1_[i], arr2_));
            }
            return result;

          default:
            throw new Error('argument of max() is not supported');
        }

      case 'Number':
        switch (this.getClass(arr2_)) {
          case 'Array':
            result = [];
            for (i = 0, l = arr2_.length; i < l; i++) {
              result.push(Math.max(arr1_, arr2_[i]));
            }
            return result;

          case 'Number':
            return Math.max(arr1_, arr2_);

          default:
            throw new Error('argument of max() is not supported');
        }

      default:
        throw new Error('argument of max() is not supported');
    }
  }

  public ref(arr_: number[], n_: number): number[] {
    let result: number[] = new Array(n_).fill(NaN);
    for (let i: number = n_, l: number = arr_.length; i < l; i++) {
      result.push(arr_[i - n_]);
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

  private getClass(o_: any): string {
    if (o_ === null) return "Null";
    if (o_ === undefined) return "Undefined";
    return Object.prototype.toString.call(o_).slice(8, -1);
  }

  private getArrSum(arr_: number[]): number {
    let sum: number = 0;
    for (let i: number = arr_.length; i--;) {
      sum += arr_[i];
    }
    return sum;
  }
}

export default new FinMath();
