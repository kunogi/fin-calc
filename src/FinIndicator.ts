import FinUtil from './FinUtil';

interface iKData {
  open: number,
  high: number,
  low: number,
  close: number,
  prevclose: number,
  volume: number,
  day: string
}
interface iMACD {
  data: {
    dif: number,
    dea: number,
    bar: number
  },
  param: {
    prop: string,
    v0: number,
    v1: number,
    v2: number
  }
}

interface iOBV {
  data: {
    obv: number,
    obvma: number
  },
  param: {
    v0: number
  }

}
class FinIndicator {
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
    let highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
      lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
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

  /**
   * 
   * @description MACD, Moving Average Convergence and Divergence
   * @param arr_ 
   * @param customData_ default to calculate based on close price with params:12,26,9
   * @returns 
   */
  public macd(arr_: number[], customData_: iMACD['param'] = { prop: 'close', v0: 12, v1: 26, v2: 9 }): iMACD['data'][] {
    let { prop, v0, v1, v2 } = customData_;
    let result: iMACD['data'][] = [];
    let arr: number[] = FinUtil.genArrByProp(arr_, prop);
    let difArr: number[] = FinUtil.arrOp(this.ema(arr, v0), this.ema(arr, v1), '-');
    let deaArr: number[] = this.ema(difArr, v2);
    let macdArr: number[] = FinUtil.arrOp(FinUtil.arrOp(difArr, deaArr, '-'), 2, '*');
    for (let i: number = 0, l: number = arr.length; i < l; i++) {
      result[i] = {
        dif: difArr[i],
        dea: deaArr[i],
        bar: macdArr[i]
      };
    }
    return result;
  }

  /**
   * 
   * @description OBV, On Balance Volume
   * @param arr_ 
   * @param customData_ 
   * @returns 
   */
  public obv(arr_: iKData[], customData_: iOBV['param'] = { v0: 30 }): iOBV['data'][] {
    const { v0 } = customData_;
    let result: iOBV['data'][] = [];
    let data: iKData = arr_[0];
    let va: number = data.volume;
    let obv: number = va;
    let sumMa: number = obv;
    result.push({
      obv: obv,
      obvma: obv
    });
    for (let i: number = 1, l: number = arr_.length; i < l; i++) {
      data = arr_[i];
      let obj: iOBV['data'] = { obv: NaN, obvma: NaN };
      result.push(obj);

      if (data.close > arr_[i - 1].close) va = Number(data.volume);
      else if (data.close == arr_[i - 1].close) va = 0;
      else va = -Number(data.volume);

      obv = va + result[i - 1].obv;
      obj.obv = obv;
      sumMa += obv;
      if (i >= v0) {
        sumMa -= result[i - v0].obv;
        obj.obvma = sumMa / v0;
      } else obj.obvma = sumMa / (i + 1);
    }

    return result;
  }
}
export default new FinIndicator();