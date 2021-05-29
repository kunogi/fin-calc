import FinUtil from './util/FinUtil';
import EMA from './EMA';
import { iKData } from './interface/iDatas';

interface iMACD {
  data: {
    dif: number,
    dea: number,
    bar: number
  },
  param: {
    prop: string,
    v0: number,//short
    v1: number,//long
    v2: number//mid
  }
}

/**
 * 
 * @description MACD, Moving Average Convergence and Divergence
  DIF = EMA(CLOSE, SHORT) - EMA(CLOSE, LONG)
  DEA = EMA(DIF, MID)
  MACD= (DIF - DEA) *2
 * @param arr_ 
 * @param customData_ default to calculate based on close price with params:12,26,9
 * @returns 
 */
export default function (arr_: iKData[], customData_: iMACD['param'] = { prop: 'close', v0: 12, v1: 26, v2: 9 }): iMACD['data'][] {
  let result: iMACD['data'][] = [];

  const { prop, v0, v1, v2 } = customData_;

  let arr: number[] = FinUtil.genArrByProp(arr_, prop),
    difArr: number[] = FinUtil.arrOp(EMA(arr, v0), EMA(arr, v1), '-'),
    deaArr: number[] = EMA(difArr, v2),
    macdArr: number[] = FinUtil.arrOp(FinUtil.arrOp(difArr, deaArr, '-'), 2, '*');

  for (let i: number = 0, l: number = arr.length; i < l; i++) {
    result[i] = {
      dif: difArr[i],
      dea: deaArr[i],
      bar: macdArr[i]
    }
  }

  return result;
}