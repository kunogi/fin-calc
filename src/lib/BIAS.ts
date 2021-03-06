import { iKData } from './interface/iDatas'
import MA from './MA'
import FinUtil from './util/FinUtil'

interface iBIAS {
  param: {
    prop: string,
    v0: number,
    v1: number,
    v2: number,
    date: string,
  },
  data: {
    date: unknown,
    bias1: number,
    bias2: number,
    bias3: number
  }
}

/**
 *
 * @param arr_
 * @param customeData_
 * @returns
 * @description
  MA_V0 = MA(CLOSE, V0)
  MA_V1 = MA(CLOSE, V1)
  MA_V2 = MA(CLOSE, V2)
  BIAS1 = (CLOSE - MA_V0) / MA_V0 * 100
  BIAS2 = (CLOSE - MA_V1) / MA_V1 * 100
  BIAS3 = (CLOSE - MA_V2) / MA_V2 * 100
 */
export default function (arr_: iKData[], customeData_: iBIAS['param'] = { prop: 'close', v0: 6, v1: 12, v2: 24, date: 'day' }): iBIAS['data'][] {
  const result: iBIAS['data'][] = []

  const { prop, v0, v1, v2, date } = customeData_

  const propArr: number[] = FinUtil.genArrByProp(arr_, prop, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date);
  
  const mav0: number[] = MA(propArr, v0)
  const mav1: number[] = MA(propArr, v1)
  const mav2: number[] = MA(propArr, v2)
  const bias1Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(propArr, mav0, '-'), mav0, '/'), 100, '*')
  const bias2Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(propArr, mav1, '-'), mav1, '/'), 100, '*')
  const bias3Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(propArr, mav2, '-'), mav2, '/'), 100, '*')

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      bias1: bias1Arr[i],
      bias2: bias2Arr[i],
      bias3: bias3Arr[i]
    }
  }

  return result
}