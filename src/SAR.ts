import FinUtil from './util/FinUtil';
import { iKData } from './interface/iDatas';

interface iSAR {
    data: {
        ignore_minmax: number,
        sar: number
    },
    param: {
        v0: number,
        v1: number,
        v2: number
    },
    calc: {
        data: number[],
        direction: number[]
    }
}

function calc(arr_: iKData[], n_: number, step_: number, max_: number): iSAR['calc'] {
  const highArr: number[] = FinUtil.genArrByProp(arr_, 'high');
  const lowArr: number[] = FinUtil.genArrByProp(arr_, 'low');
  const len: number = arr_.length;
  const result: number[] = [];
  const stepArr: number[] = [];
  const extremeArr: number[] = [];
  const directionArr: number[] = [];
  function up(l: number):any {
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
  function down(l: number): any {
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
 * @param arr_
 * @param n_
 * @param step_
 * @param max_
 * @returns
 */
export default function (arr_: iKData[], customData_: iSAR['param'] = { v0: 1, v1: 1, v2: 1 }): iSAR['data'][] {
  const result: iSAR['data'][] = [];

  const { v0, v1, v2 } = customData_;

  const sarArr: iSAR['calc'] = calc(arr_, v0, v1, v2);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      ignore_minmax: sarArr.direction[i],
      sar: sarArr.data[i]
    };
  }

  return result;
}
