import FinUtil from './util/FinUtil'
import { iKData } from './interface/iDatas'
import MA from './MA'

interface iWVAD {
  param: {
    v0: number,
    open: string,
    high: string,
    low: string,
    close: string,
    date: string,
    volume: string,
  },
  data: {
    date: unknown,
    wvad: number,
    wvadma: number
  }
}

/**
 *
 * @param arr_
 * @param customeData_
 * @returns
 * @description
  WVAD = (CLOSE - OPEN) / (HIGH - LOW) * VOL
 */
export default function (arr_: iKData[], customeData_: iWVAD['param'] = { v0: 6, date: 'day', open: 'open', high: 'high', low: 'low', close: 'close', volume: 'volume' }): iWVAD['data'][] {
  const result: iWVAD['data'][] = []

  const { v0, open, high, low, close, date, volume } = customeData_

  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)
  const closeArr: number[] = FinUtil.genArrByProp(arr_, close)
  const openArr: number[] = FinUtil.genArrByProp(arr_, open)
  const highArr: number[] = FinUtil.genArrByProp(arr_, high)
  const lowArr: number[] = FinUtil.genArrByProp(arr_, low)
  const volArr: number[] = FinUtil.genArrByProp(arr_, volume)

  const wvadArr: number[] = FinUtil.arrOp(FinUtil.arrOp(
    FinUtil.arrOp(closeArr, openArr, '-'), FinUtil.arrOp(highArr, lowArr, '-'), '/'), volArr, '*')
  const maWvadArr: number[] = MA(wvadArr, v0)

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      wvad: wvadArr[i],
      wvadma: maWvadArr[i]
    }
  }

  return result
}