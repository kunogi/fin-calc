import FinUtil from './util/FinUtil'
import { iKData } from './interface/iDatas'
import MA from './MA'

interface iENE {
  param: {
    date: string,
    prop: string,
    v0: number,
    v1: number,
    v2: number
  },
  data: {
    date: unknown,
    upper: number,
    lower: number,
    ene: number
  }
}

/**
 * @description
UPPER = (1 + M1 / 100) * MA(CLOSE, M)
LOWER = (1 - M2 / 100) * MA(CLOSE, M)
ENE = (UPPER + LOWER) / 2
 */
export default function (arr_: iKData[], customData_: iENE['param'] = { v0: 11, v1: 9, v2: 10, date: 'day', prop: 'close' }): iENE['data'][] {
  const result: iENE['data'][] = []

  const { prop, v0: M1, v1: M2, v2: M, date } = customData_

  const arr: number[] = FinUtil.genArrByProp(arr_, prop, Number)
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date);

  //UPPER = (1 + M1 / 100) * MA(CLOSE, M)
  const upper: number[] = FinUtil.arrOp(MA(arr, M), (1 + M1 / 100), '*');
  //LOWER = (1 - M2 / 100) * MA(CLOSE, M)
  const lower: number[] = FinUtil.arrOp(MA(arr, M), (1 - M2 / 100), '*');
  //ENE = (UPPER + LOWER) / 2
  const ene: number[] = FinUtil.arrOp(FinUtil.arrOp(upper, lower, '+'), 2, '/');

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      upper: upper[i],
      lower: lower[i],
      ene: ene[i]
    }
  }

  return result
}