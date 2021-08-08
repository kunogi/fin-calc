import FinUtil from './util/FinUtil'
import { iKData } from './interface/iDatas'
import MA from './MA'

interface iBBIBOLL {
  param: {
    prop: string,
    v0: number, // N
    v1: number, // M
    date: string
  },
  data: {
    date: unknown,
    bbiboll: number,
    upr: number,
    dwn: number
  }
}

/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  BBIBOLL = (MA(CLOSE, 3) + MA(CLOSE, 6) + MA(CLOSE, 12) + MA(CLOSE, 24)) / 4
  UPR = BBIBOLL + M * STD(BBIBOLL, N)
  DWN = BBIBOLL - M * STD(BBIBOLL, N)
 */
export default function (arr_: iKData[], customData_: iBBIBOLL['param'] = { prop: 'close', v0: 11, v1: 6, date: 'day' }): iBBIBOLL['data'][] {
  const result: iBBIBOLL['data'][] = []

  const { prop, v0: N, v1: M, date } = customData_

  const arr: number[] = FinUtil.genArrByProp(arr_, prop, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date);

  // BBIBOLL:(MA(CLOSE,3)+MA(CLOSE,6)+MA(CLOSE,12)+MA(CLOSE,24))/4:
  const bbiArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(
    MA(arr, 3), MA(arr, 6), '+'), MA(arr, 12), '+'), MA(arr, 24), '+'), 4, '/')

  // UPR:BBIBOLL+M*STD(BBIBOLL,N):
  const uprArr: number[] = FinUtil.arrOp(bbiArr, FinUtil.arrOp(FinUtil.std(bbiArr, N), M, '*'), '+')

  // DWN:BBIBOLL-M*STD(BBIBOLL,N):
  const dwnArr: number[] = FinUtil.arrOp(bbiArr, FinUtil.arrOp(FinUtil.std(bbiArr, N), M, '*'), '-')

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      bbiboll: bbiArr[i],
      upr: uprArr[i],
      dwn: dwnArr[i]
    }
  }

  return result
}