import { iKData } from "./interface/iDatas";
import FinUtil from './util/FinUtil';
import MA from './MA';

interface iDMA {
  param: {
    v0: number,//SHORT
    v1: number,//LONG
    v2: number,//M
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
  DIF = MA(CLOSE,SHORT) - MA(CLOSE,LONG)
  DMA = MA(DIF,M)
 */
export default function (arr_: iKData[], customeData_: iDMA['param'] = { prop: 'close', v0: 10, v1: 50, v2: 10 }) {
  let result: iDMA['data'][] = [];

  const { v0: SHORT, v1: LONG, v2: M, prop } = customeData_;

  let arr: number[] = FinUtil.genArrByProp(arr_, prop);

  let maArr1: number[] = MA(arr, SHORT),
    maArr2: number[] = MA(arr, LONG),
    difArr: number[] = FinUtil.arrOp(maArr1, maArr2, '-'),
    amaArr: number[] = MA(difArr, M);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      dif: difArr[i],
      difma: amaArr[i]
    }
  }

  return result;
}