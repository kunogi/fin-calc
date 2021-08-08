import { iKData } from './interface/iDatas'
import FinUtil from './util/FinUtil'

interface iCDP {
  param: {
    date: string,
    high: string,
    low: string,
    close: string
  },
  data: {
    date: unknown,
    cdp: number,
    ah: number,
    al: number,
    nh: number,
    nl: number
  }
}
/**
@description
  CH = REF(HIGH, 1)
  CL = REF(LOW, 1)
  CC = REF(CLOSE, 1)
  CDP = (CH + CL + CC) / 3
  AH = CDP + CH - CL
  AL = CDP - CH + CL
  NH = CDP * 2 - CL
  NL = CDP * 2 - CH
 * */
export default function (arr_: iKData[], customData_: iCDP['param'] = { date: 'day', high: 'high', low: 'low', close: 'close' }): iCDP['data'][] {
  const result: iCDP['data'][] = []

  const { date, high, low, close } = customData_

  const highArr: number[] = FinUtil.genArrByProp(arr_, high, Number)
  const lowArr: number[] = FinUtil.genArrByProp(arr_, low, Number)
  const closeArr: number[] = FinUtil.genArrByProp(arr_, close, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)
  
  const ch: number[] = FinUtil.ref(highArr, 1)
  const cl: number[] = FinUtil.ref(lowArr, 1)
  const cc: number[] = FinUtil.ref(closeArr, 1)
  const cdp: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(ch, cl, '+'), cc, '+'), 3, '/')
  const ah: number[] = FinUtil.arrOp(FinUtil.arrOp(cdp, ch, '+'), cl, '-')
  const al: number[] = FinUtil.arrOp(FinUtil.arrOp(cdp, ch, '-'), cl, '+')
  const nh: number[] = FinUtil.arrOp(FinUtil.arrOp(cdp, 2, '*'), cl, '-')
  const nl: number[] = FinUtil.arrOp(FinUtil.arrOp(cdp, 2, '*'), ch, '-')

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      cdp: cdp[i],
      ah: ah[i],
      al: al[i],
      nh: nh[i],
      nl: nl[i]
    }
  }

  return result
}