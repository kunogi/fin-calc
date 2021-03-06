import { iKData } from './interface/iDatas'
import FinUtil from './util/FinUtil'

interface iKDJ {
  param: {
    P1: number, // P1
    P2: number, // P2
    P3: number, // P3
    date: string,
    close: string,
    high: string,
    low: string
  },
  data: {
    date: unknown,
    k: number,
    d: number,
    j: number
  }
}

/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  RSV = (CLOSE - LLV(LOW, P1)) / (HHV(HIGH, P1) - LLV(LOW, P1)) * 100
  K = SMA(RSV, P2, 1)
  D = SMA(K, P3, 1)
  J = 3 * K - 2 * D
 */
export default function (arr_: iKData[], customData_: iKDJ['param'] = { P1: 9, P2: 3, P3: 3, date: 'day', close: 'close', low: 'low', high: 'high' }): iKDJ['data'][] {
  const result: iKDJ['data'][] = []

  const { P1, P2, P3, close, high, low, date } = customData_

  const closeArr: number[] = FinUtil.genArrByProp(arr_, close, Number)
  const lowArr: number[] = FinUtil.genArrByProp(arr_, low, Number)
  const highArr: number[] = FinUtil.genArrByProp(arr_, high, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)

  // RSV = (CLOSE - LLV(LOW, P1)) / (HHV(HIGH, P1) - LLV(LOW, P1)) * 100:
  const rsvArr: number[] = FinUtil.arrOp(FinUtil.arrOp(
    FinUtil.arrOp(closeArr, FinUtil.llv(lowArr, P1), '-'),
    FinUtil.arrOp(FinUtil.hhv(highArr, P1), FinUtil.llv(lowArr, P1), '-'), '/'), 100, '*')

  const kArr: number[] = FinUtil.sma(rsvArr, P2, 1)
  const dArr: number[] = FinUtil.sma(kArr, P3, 1)
  const jArr: number[] = FinUtil.arrOp(FinUtil.arrOp(kArr, 3, '*'), FinUtil.arrOp(dArr, 2, '*'), '-')

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      k: kArr[i],
      d: dArr[i],
      j: jArr[i]
    }
  }

  return result
}