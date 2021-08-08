import FinUtil from './util/FinUtil'
import MA from './MA'
import { iKData } from './interface/iDatas'

interface iBOLL {
  param: {
    prop: string,
    v0: number, // PERIOD
    v1: number, // TIMES
    date: string
  },
  data: {
    date: unknown,
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
export default function (arr_: iKData[], customData_: iBOLL['param'] = { prop: 'close', v0: 20, v1: 2, date: 'day' }): iBOLL['data'][] {
  const result: iBOLL['data'][] = new Array(arr_.length)

  const { prop, v0: PERIOD, v1: TIMES, date } = customData_

  const arr: number[] = FinUtil.genArrByProp(arr_, prop, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)
  
  const maArr: number[] = MA(arr, PERIOD)
  const stdArr: number[] = FinUtil.arrOp(FinUtil.std(arr, PERIOD), TIMES, '*')
  const upperArr: number[] = FinUtil.arrOp(maArr, stdArr, '+')
  const lowerArr: number[] = FinUtil.arrOp(maArr, stdArr, '-')

  for (let i = 0, l = arr.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      boll: maArr[i],
      upper: upperArr[i],
      lower: lowerArr[i]
    }
  }

  return result
}