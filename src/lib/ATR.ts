import { iKData } from './interface/iDatas'
import FinUtil from './util/FinUtil'
import MA from './MA'

interface iATR {
  param: {
    //open: string,
    high: string,
    low: string,
    close: string,
    date: string,
    //volume: string,
    v0: number,
    //v1: number
  },
  data: {
    date: unknown,
    tr1: number,
    atr1: number
  }
}

/**
 * @description
TR1 = MAX(MAX((HIGH - LOW), ABS(REF(CLOSE, 1) - HIGH)), ABS(REF(CLOSE, 1) - LOW))
ATR1 = MA(TR1, M)
 */
export default function (arr_: iKData[], customData_: iATR['param'] = { v0: 26, date: 'day', high: 'high', low: 'low', close: 'close' }): iATR['data'][] {
  const result: iATR['data'][] = []

  const { high, low, close, date, v0: M } = customData_

  const closeArr: number[] = FinUtil.genArrByProp(arr_, close, Number)
  const highArr: number[] = FinUtil.genArrByProp(arr_, high, Number)
  const lowArr: number[] = FinUtil.genArrByProp(arr_, low, Number)
  //const openArr: number[] = FinUtil.genArrByProp(arr_, open, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)

  //calc:
  //TR1 = MAX(MAX((HIGH - LOW), ABS(REF(CLOSE, 1) - HIGH)), ABS(REF(CLOSE, 1) - LOW))
  const maxHL: number[] = FinUtil.arrOp(highArr, lowArr, '-')
  const refC: number[] = FinUtil.ref(closeArr, 1)
  const absRefCH: number[] = FinUtil.arrOp(refC, highArr, '-')
  const maxA: number[] = FinUtil.max(maxHL, absRefCH) as number[]
  const absRefCL: number[] = FinUtil.arrOp(refC, lowArr, '-')
  const tr1Arr: number[] = FinUtil.max(maxA, absRefCL) as number[]

  //ATR1 = MA(TR1, M)
  const atr1Arr: number[] = MA(tr1Arr, M)

  //working data:
  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      tr1: tr1Arr[i],
      atr1: atr1Arr[i]
    }
  }

  return result
}