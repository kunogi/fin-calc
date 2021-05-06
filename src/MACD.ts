import FinUtil from './FinUtil';
import EMA from './EMA';

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

/**
 * 
 * @description MACD, Moving Average Convergence and Divergence
 * @param arr_ 
 * @param customData_ default to calculate based on close price with params:12,26,9
 * @returns 
 */
export default function (arr_: number[], customData_: iMACD['param'] = { prop: 'close', v0: 12, v1: 26, v2: 9 }): iMACD['data'][] {
  let { prop, v0, v1, v2 } = customData_;
  let result: iMACD['data'][] = [];
  let arr: number[] = FinUtil.genArrByProp(arr_, prop);
  let difArr: number[] = FinUtil.arrOp(EMA(arr, v0), EMA(arr, v1), '-');
  let deaArr: number[] = EMA(difArr, v2);
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