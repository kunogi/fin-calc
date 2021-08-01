import FinUtil from './util/FinUtil'
import { iKData } from './interface/iDatas'
import EMA from './EMA'

interface iDMI {
  param: {
    v0: number, // N
    v1: number// M
  },
  data: {
    pdi: number,
    mdi: number,
    adx: number,
    adxr: number
  }
}

/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  MTR = EXPMEMA(MAX(MAX(HIGH - LOW, ABS(HIGH - REF(CLOSE, 1))), ABS(REF(CLOSE, 1) - LOW)), N)
  HD = HIGH - REF(HIGH, 1)
  LD = REF(LOW, 1) - LOW
  DMP = EXPMEMA(IF(HD > 0 && HD > LD, HD, 0), N)
  DMM = EXPMEMA(IF(LD > 0 && LD > HD, LD, 0), N)
  PDI = DMP * 100 / MTR
  MDI = DMM * 100 / MTR
  ADX = EXPMEMA(ABS(MDI - PDI) / (MDI + PDI) * 100, M)
  ADXR = EXPMEMA(ADX, M)
 */

export default function(arr_: iKData[], customData_: iDMI['param'] = { v0: 14, v1: 6 }): iDMI['data'][] {
  const result: iDMI['data'][] = []

  const { v0: N, v1: M } = customData_

  const closeArr: number[] = FinUtil.genArrByProp(arr_, 'close')
  const highArr: number[] = FinUtil.genArrByProp(arr_, 'high')
  const lowArr: number[] = FinUtil.genArrByProp(arr_, 'low')

  // MTR=EXPMEMA(MAX(MAX(HIGH-LOW, ABS(HIGH-REF(CLOSE,1))), ABS(REF(CLOSE,1)-LOW)),N):
  const mtrArr: number[] = EMA(
    FinUtil.max(
      FinUtil.max(
        FinUtil.arrOp(highArr, lowArr, '-'),
        FinUtil.abs(FinUtil.arrOp(highArr, FinUtil.ref(closeArr, 1), '-'))
      ),
      FinUtil.abs(FinUtil.arrOp(FinUtil.ref(closeArr, 1), lowArr, '-'))
    ), N)

  const hdArr: number[] = FinUtil.arrOp(highArr, FinUtil.ref(highArr, 1), '-')
  const ldArr: number[] = FinUtil.arrOp(FinUtil.ref(lowArr, 1), lowArr, '-')
  let dmpArr: number[] = []; let dmmArr: number[] = []
  for (let hd: number, ld: number, i = 0, l: number = hdArr.length; i < l; i++) {
    hd = hdArr[i]
    ld = ldArr[i]
    dmpArr.push(hd > 0 && hd > ld ? hd : 0)
    dmmArr.push(ld > 0 && ld > hd ? ld : 0)
  }
  dmpArr = EMA(dmpArr, N)
  dmmArr = EMA(dmmArr, N)

  const pdiArr: number[] = FinUtil.arrOp(FinUtil.arrOp(dmpArr, 100, '*'), mtrArr, '/')
  const mdiArr: number[] = FinUtil.arrOp(FinUtil.arrOp(dmmArr, 100, '*'), mtrArr, '/')
  // ADX=EXPMEMA(ABS(MDI-PDI)/(MDI+PDI)*100,M):
  const adxArr: number[] = EMA(FinUtil.arrOp(FinUtil.arrOp(
    FinUtil.abs(FinUtil.arrOp(mdiArr, pdiArr, '-')), FinUtil.arrOp(mdiArr, pdiArr, '+'), '/'), 100, '*'), M)
  const adxrArr: number[] = EMA(adxArr, M)

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      pdi: pdiArr[i],
      mdi: mdiArr[i],
      adx: adxArr[i],
      adxr: adxrArr[i]
    }
  }

  return result
}