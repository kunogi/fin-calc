import { iKData } from "./interface/iDatas";
import FinUtil from "./util/FinUtil";

interface iMi {
  param: {
    prop: string,
    v0: number, // M
    date: string
  },
  data: {
    date: unknown,
    aa: number,
    mi: number
  }
}

/**
 * 
 * @param arr_ 
 * @param customData_ 
 * @description
AA = C - REF(C, M)
MI = SMA(AA, M, 1)
 */
export default function (arr_: iKData[], customData_: iMi['param'] = { prop: 'close', v0: 12, date: 'day' }): iMi['data'][] {
  const result: iMi['data'][] = []

  const { prop, v0: M, date } = customData_

  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date)

  const arr: number[] = FinUtil.genArrByProp(arr_, prop, Number)

  const aaArr: number[] = FinUtil.arrOp(arr, FinUtil.ref(arr, M), '-')
  const miArr: number[] = FinUtil.sma(aaArr, M, 1);

  for (let i = 0, l = arr.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      aa: aaArr[i],
      mi: miArr[i]
    }
  }

  return result
}