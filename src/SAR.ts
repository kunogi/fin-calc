import FinUtil from './FinUtil';
/**
 * 
 * @param arr_ 
 * @param n_ 
 * @param step_ 
 * @param max_ 
 * @returns 
 */
 export default function(arr_: any[], n_: number, step_: number, max_: number): { data: number[], direction: number[] } {
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