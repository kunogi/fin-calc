import { iKData } from './interface/iDatas'
import MA from './MA'
import FinUtil from './util/FinUtil'

interface iEMV {
  param: {
    v0: number, // N
    v1: number, // N1
    date: string,
    high: string,
    low: string,
    volume: string
  },
  data: {
    date: unknown,
    emv: number,
    maemv: number
  }
}

/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  VOLUME = MA(VOL, N) / VOL
  MID = 100 * (HIGH + LOW - REFV(HIGH + LOW, 1)) / (HIGH + LOW)
  EMV = MA(MID * VOLUME * (HIGH - LOW) / MA(HIGH - LOW, N), N)
  EMVA = MA(EMV, N1)
 */
export default function (arr_: iKData[], customData_: iEMV['param'] = { v0: 14, v1: 9, date: 'day', high: 'high', low: 'low', volume: 'volume' }): iEMV['data'][] {
  const result: iEMV['data'][] = []

  const { v0: N, v1: N1, date, high, low, volume } = customData_

  const highArr: number[] = FinUtil.genArrByProp(arr_, high, Number)
  const lowArr: number[] = FinUtil.genArrByProp(arr_, low, Number)
  const volumeArr: number[] = FinUtil.genArrByProp(arr_, volume, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)

  const volArr: number[] = FinUtil.arrOp(MA(volumeArr, N), volumeArr, '/')
  const hPlusLArr: number[] = FinUtil.arrOp(highArr, lowArr, '+')
  const hMinsLArr: number[] = FinUtil.arrOp(highArr, lowArr, '-')

  // MID = 100 * (HIGH + LOW - REFV(HIGH + LOW, 1)) / (HIGH + LOW):
  const midArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(hPlusLArr, FinUtil.ref(hPlusLArr, 1), '-'), hPlusLArr, '/'), 100, '*')
  // EMV = MA(MID * VOLUME * (HIGH - LOW) / MA(HIGH - LOW, N), N):
  const emvArr: number[] = MA(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(midArr, volArr, '*'), hMinsLArr, '*'), MA(hMinsLArr, N), '/'), N)
  const maemvArr: number[] = MA(emvArr, N1)

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      emv: emvArr[i],
      maemv: maemvArr[i]
    }
  }

  return result
}