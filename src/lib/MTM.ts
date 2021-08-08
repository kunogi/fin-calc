import { iKData } from './interface/iDatas'
import FinUtil from './util/FinUtil'
import MA from './MA'

interface iMTM {
  param: {
    prop: string,
    v0: number, // N
    v1: number, // M
    date: string
  },
  data: {
    date: unknown,
    mtm: number,
    mtmma: number
  }
}

/**
 * @description
MTM = CLOSE - REF(CLOSE, N)
MTMMA = MA(MTM, M)
 * */
export default function (arr_: iKData[], customData_: iMTM['param'] = { prop: 'close', v0: 12, v1: 6, date: 'day' }): iMTM['data'][] {
  const result: iMTM['data'][] = []

  const { prop, v0: N, v1: M, date } = customData_

  const arr: number[] = FinUtil.genArrByProp(arr_, prop, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)

  const ref: number[] = FinUtil.ref(arr, N)
  const mtm: number[] = FinUtil.arrOp(arr, ref, '-')
  const mtmma: number[] = MA(mtm, M)

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      mtm: mtm[i],
      mtmma: mtmma[i]
    }
  }

  return result
}