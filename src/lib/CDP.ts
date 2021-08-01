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
import { iKData } from './interface/iDatas'
import FinUtil from './util/FinUtil'

interface iCDP {
  param: {

  },
  data: {
    cdp: number,
    ah: number,
    al: number,
    nh: number,
    nl: number
  }
}
export default function(arr_: iKData[]): iCDP['data'][] {
  const result: iCDP['data'][] = []

  const high: number[] = FinUtil.genArrByProp(arr_, 'high')
  const low: number[] = FinUtil.genArrByProp(arr_, 'low')
  const close: number[] = FinUtil.genArrByProp(arr_, 'close')

  const ch: number[] = FinUtil.ref(high, 1)
  const cl: number[] = FinUtil.ref(low, 1)
  const cc: number[] = FinUtil.ref(close, 1)
  const cdp: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(ch, cl, '+'), cc, '+'), 3, '/')
  const ah: number[] = FinUtil.arrOp(FinUtil.arrOp(cdp, ch, '+'), cl, '-')
  const al: number[] = FinUtil.arrOp(FinUtil.arrOp(cdp, ch, '-'), cl, '+')
  const nh: number[] = FinUtil.arrOp(FinUtil.arrOp(cdp, 2, '*'), cl, '-')
  const nl: number[] = FinUtil.arrOp(FinUtil.arrOp(cdp, 2, '*'), ch, '-')

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      cdp: cdp[i],
      ah: ah[i],
      al: al[i],
      nh: nh[i],
      nl: nl[i]
    }
  }

  return result
}