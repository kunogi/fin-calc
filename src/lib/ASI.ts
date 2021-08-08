import { iKData } from './interface/iDatas'
import MA from './MA'
import FinUtil from './util/FinUtil'

interface iASI {
  param: {
    open: string,
    high: string,
    low: string,
    close: string,
    date: string,
    volume: string,
    v0: number,
    v1: number
  },
  data: {
    date: unknown,
    asi: number,
    asit: number
  }
}

export default function (arr_: iKData[], customData_: iASI['param'] = { v0: 26, v1: 10, date: 'day', open: 'open', high: 'high', low: 'low', close: 'close', volume: 'volume' }): iASI['data'][] {
  const result: iASI['data'][] = []

  const { open, high, low, close, date, v0, v1 } = customData_

  const closeArr: number[] = FinUtil.genArrByProp(arr_, close, Number)
  const highArr: number[] = FinUtil.genArrByProp(arr_, high, Number)
  const lowArr: number[] = FinUtil.genArrByProp(arr_, low, Number)
  const openArr: number[] = FinUtil.genArrByProp(arr_, open, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date);

  const lcArr: number[] = FinUtil.ref(closeArr, 1)
  const aaArr: number[] = FinUtil.abs(FinUtil.arrOp(highArr, lcArr, '-'))
  const bbArr: number[] = FinUtil.abs(FinUtil.arrOp(lowArr, lcArr, '-'))
  const ccArr: number[] = FinUtil.abs(FinUtil.arrOp(highArr, FinUtil.ref(lowArr, 1), '-'))
  const ddArr: number[] = FinUtil.abs(FinUtil.arrOp(lcArr, FinUtil.ref(openArr, 1), '-'))

  const rArr: number[] = []
  for (let i = 0, l = aaArr.length; i < l; i++) {
    if (aaArr[i] > bbArr[i] && aaArr[i] > ccArr[i]) {
      rArr.push(aaArr[i] + bbArr[i] / 2 + ddArr[i] / 4)
    } else if (bbArr[i] > ccArr[i] && bbArr[i] > aaArr[i]) {
      rArr.push(bbArr[i] + aaArr[i] / 2 + ddArr[i] / 4)
    } else {
      rArr.push(ccArr[i] + ddArr[i] / 4)
    }
  }

  const xArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, lcArr, '-'), FinUtil.arrOp(FinUtil.arrOp(closeArr, openArr, '-'), 2, '/'), '+'), lcArr, '+'), FinUtil.ref(openArr, 1), '-')
  const siArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(xArr, 16, '*'), rArr, '/'), FinUtil.max(aaArr, bbArr), '*')
  const asiArr: number[] = FinUtil.sum(siArr, v0)
  const asitArr: number[] = MA(asiArr, v1)

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      asi: asiArr[i],
      asit: asitArr[i]
    }
  }

  return result
}