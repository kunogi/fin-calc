import FinUtil from './util/FinUtil';
import EMA from './EMA';
import { iKData } from './interface/iDatas';

interface iMACD {
  param: {
    prop: string,
    v0: number, // SHORT
    v1: number, // LONG
    v2: number// MID
  },
  data: {
    dif: number,
    dea: number,
    bar: number
  }
}

/**
 *
 * @description MACD, Moving Average Convergence and Divergence
  DIF = EMA(CLOSE, SHORT) - EMA(CLOSE, LONG)
  DEA = EMA(DIF, MID)
  MACD = (DIF - DEA) * 2
 * @param arr_
 * @param customData_ default to calculate based on close price with params:12,26,9
 * @returns
 */
export default function (arr_: iKData[], customData_: iMACD['param'] = { prop: 'close', v0: 12, v1: 26, v2: 9 }): iMACD['data'][] {
  const result: iMACD['data'][] = [];

  const { prop, v0: SHORT, v1: LONG, v2: MID } = customData_;

  const arr: number[] = FinUtil.genArrByProp(arr_, prop);

  const difArr: number[] = FinUtil.arrOp(EMA(arr, SHORT), EMA(arr, LONG), '-');
  const deaArr: number[] = EMA(difArr, MID);
  const macdArr: number[] = FinUtil.arrOp(FinUtil.arrOp(difArr, deaArr, '-'), 2, '*');

  for (let i = 0, l: number = arr.length; i < l; i++) {
    result[i] = {
      dif: difArr[i],
      dea: deaArr[i],
      bar: macdArr[i]
    };
  }

  return result;
}