import { iKData } from "./interface/iDatas";
import FinUtil from './util/FinUtil';
import MA from './MA';

interface iDMA {
  param: {
    v0: number,//short
    v1: number,//long
    v2: number,
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
export default function (arr_: iKData[], customeData_: iDMA['param'] = { v0: 10, v1: 50, v2: 10, prop: 'close' }) {
  let result: iDMA['data'][] = [];

  const { v0, v1, v2, prop } = customeData_;

  let arr: number[] = FinUtil.genArrByProp(arr_, prop),
    maArr1: number[] = MA(arr, v0),
    maArr2: number[] = MA(arr, v1),
    difArr: number[] = FinUtil.arrOp(maArr1, maArr2, '-'),
    amaArr: number[] = MA(difArr, v2);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      dif: difArr[i],
      difma: amaArr[i]
    }
  }

  return result;
}