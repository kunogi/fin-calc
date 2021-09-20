import { iKData } from './interface/iDatas'
import FinUtil from './util/FinUtil'

interface iRC {
  param: {
    v0: number, // M
    date: string,
    prop: string
  },
  data: {
    date: unknown,
    arc: number
  }
}

/**
 * 
 * @param arr_ 
 * @param customData_ 
 * @description
RC = C / REF(C, M);
ARC = SMA(REF(RC, 1), M, 1);
 * 
 */
export default function (arr_: iKData[], customData_: iRC['param'] = { v0: 50, date: 'day', prop: 'close' }): iRC['data'][] {
  const result: iRC['data'][] = []

  const { v0: M, prop, date } = customData_
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date);

  const propArr: number[] = FinUtil.genArrByProp(arr_, prop);
  
  const RC: number[] = FinUtil.arrOp(propArr, FinUtil.ref(propArr, M), '/');
  const ref: number[] = FinUtil.ref(RC, 1)
  const ARC: number[] = FinUtil.sma(ref, M, 1);

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      arc: ARC[i]
    }
  }

  return result
}