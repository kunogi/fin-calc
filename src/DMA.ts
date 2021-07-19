import { iKData } from './interface/iDatas';
import FinUtil from './util/FinUtil';
import MA from './MA';

interface iDMA {
  param: {
    v0: number, // SHORT
    v1: number, // LONG
    v2: number, // M
    prop: string
  },
  data: {
    dif: number,
    difma: number
  }
}

/**
 *
 * @param arr_
 * @param customeData_
 * @returns
 * @description
  DIF = MA(CLOSE, SHORT) - MA(CLOSE, LONG)
  DMA = MA(DIF, M)
 */
export default function (arr_: iKData[], customeData_: iDMA['param'] = { prop: 'close', v0: 10, v1: 50, v2: 10 }): iDMA['data'][] {
  const result: iDMA['data'][] = [];

  const { v0: SHORT, v1: LONG, v2: M, prop } = customeData_;

  const arr: number[] = FinUtil.genArrByProp(arr_, prop);

  const maArr1: number[] = MA(arr, SHORT);
  const maArr2: number[] = MA(arr, LONG);
  const difArr: number[] = FinUtil.arrOp(maArr1, maArr2, '-');
  const amaArr: number[] = MA(difArr, M);

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      dif: difArr[i],
      difma: amaArr[i]
    };
  }

  return result;
}