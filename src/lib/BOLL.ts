import FinUtil from './util/FinUtil'
import MA from './MA'
import { iKData } from './interface/iDatas'

interface iBOLL {
  param: {
    prop: string,
    v0: number, // PERIOD
    v1: number// TIMES
  },
  data: {
    boll: number,
    upper: number,
    lower: number
  }
}

/**
 * @param arr_
 * @param customData_
 * @returns
 * @description
  MID  = MA(CLOSE, PERIOD)
  UPPER= MID + TIMES * STD(CLOSE, PERIOD)
  LOWER= MID - TIMES * STD(CLOSE, PERIOD)
 */
export default function(arr_: iKData[], customData_: iBOLL['param'] = { prop: 'close', v0: 20, v1: 2 }): iBOLL['data'][] {
  const result: iBOLL['data'][] = new Array(arr_.length)

  const { prop, v0: PERIOD, v1: TIMES } = customData_

  const arr: number[] = FinUtil.genArrByProp(arr_, prop)
  const maArr: number[] = MA(arr, PERIOD)
  const stdArr: number[] = FinUtil.arrOp(FinUtil.std(arr, PERIOD), TIMES, '*')
  const upperArr: number[] = FinUtil.arrOp(maArr, stdArr, '+')
  const lowerArr: number[] = FinUtil.arrOp(maArr, stdArr, '-')

  for (let i = 0, l: number = arr.length; i < l; i++) {
    result[i] = {
      boll: maArr[i],
      upper: upperArr[i],
      lower: lowerArr[i]
    }
  }

  return result
}