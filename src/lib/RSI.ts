import FinUtil from './util/FinUtil'

interface iRSI {
  param: {
    prop: string,
    v0: number,
    v1: number,
    v2: number,
    date: string
  },
  data: {
    date: unknown,
    rsi1: number,
    rsi2: number,
    rsi3: number
  }
}

/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  LC = REF(CLOSE, 1)
  MAXARR = MAX(CLOSE - LC, 0)
  ABSARR = ABS(CLOSE - LC)
  RSI1 = SMA(MAXARR, v0, 1) / SMA(ABSARR, v0, 1) * 100
  RSI2 = SMA(MAXARR, v1, 1) / SMA(ABSARR, v1, 1) * 100
  RSI3 = SMA(MAXARR, v2, 1) / SMA(ABSARR, v2, 1) * 100
 */
export default function(arr_: number[], customData_: iRSI['param'] = { prop: 'close', v0: 6, v1: 12, v2: 24, date: 'day'  }): iRSI['data'][] {
  const result: iRSI['data'][] = []

  const { prop, v0, v1, v2,date } = customData_

  const propArr: number[] = FinUtil.genArrByProp(arr_, prop)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)

  const lcArr: number[] = FinUtil.ref(propArr, 1)
  const subArr: number[] = FinUtil.arrOp(propArr, lcArr, '-')
  const maxArr: number[] = FinUtil.max(subArr, 0) as number[]
  const absArr: number[] = FinUtil.abs(subArr)
  const rsi1Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.sma(maxArr, v0, 1), FinUtil.sma(absArr, v0, 1), '/'), 100, '*')
  const rsi2Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.sma(maxArr, v1, 1), FinUtil.sma(absArr, v1, 1), '/'), 100, '*')
  const rsi3Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.sma(maxArr, v2, 1), FinUtil.sma(absArr, v2, 1), '/'), 100, '*')

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      rsi1: rsi1Arr[i],
      rsi2: rsi2Arr[i],
      rsi3: rsi3Arr[i]
    }
  }

  return result
}