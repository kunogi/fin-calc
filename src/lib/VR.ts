import { iKData } from './interface/iDatas'
import MA from './MA'
import FinUtil from './util/FinUtil'

interface iVR {
  param: {
    prop: string,
    v0: number,
    v1: number
  },
  data: {
    vr: number,
    mavr: number
  }
}

/**
 * @description
  ref1 = REF(CLOSE, 1)
  TH = SUM(IFF(CLOSE > LC, VOL, 0), N)
  TL = SUM(IFF(CLOSE < LC, VOL, 0), N)
  TQ = SUM(IFF(CLOSE = LC, VOL, 0), N)
  VR = 100 * (TH * 2 + TQ) / (TL * 2 + TQ)
  VRMA = MA(VR, M)
 */
export default function (arr_: iKData[], customData_: iVR['param'] = { prop: 'close', v0: 26, v1: 6 }): iVR['data'][] {
  const result: iVR['data'][] = []

  const { prop, v0: N, v1: M } = customData_

  const propArr: number[] = FinUtil.genArrByProp(arr_, prop)
  const volumeArr: number[] = FinUtil.genArrByProp(arr_, 'volume')

  const ref1Arr: number[] = FinUtil.ref(propArr, 1)
  let thArr: number[] = []
  let tlArr: number[] = []
  let tqArr: number[] = []
  // TH = SUM(IFF(CLOSE > LC, VOL, 0), N)
  // TL = SUM(IFF(CLOSE < LC, VOL, 0), N)
  // TQ = SUM(IFF(CLOSE = LC, VOL, 0), N):
  for (let i = 0, l: number = propArr.length; i < l; i++) {
    thArr.push(propArr[i] > ref1Arr[i] ? volumeArr[i] : 0)
    tlArr.push(propArr[i] < ref1Arr[i] ? volumeArr[i] : 0)
    tqArr.push(propArr[i] === ref1Arr[i] ? volumeArr[i] : 0)
  }
  thArr = FinUtil.sum(thArr, N)
  tlArr = FinUtil.sum(tlArr, N)
  tqArr = FinUtil.sum(tqArr, N)

  // VR = 100 * (TH * 2 + TQ) / (TL * 2 + TQ):
  const vrArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(
    FinUtil.arrOp(thArr, 2, '*'), tqArr, '+'), 100, '*'), FinUtil.arrOp(FinUtil.arrOp(tlArr, 2, '*'), tqArr, '+'), '/')
  const mavrArr = MA(vrArr, M)

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      vr: vrArr[i],
      mavr: mavrArr[i]
    }
  }

  return result
}