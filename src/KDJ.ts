import { iKData } from './interface/iDatas';
import FinUtil from './util/FinUtil';

interface iKDJ {
  param: {
    v0: number,
    v1: number,
    v2: number
  },
  data: {
    k: number,
    d: number,
    j: number
  }
}
export default function (arr_: iKData[], customData_: iKDJ['param'] = { v0: 9, v1: 3, v2: 3 }): iKDJ['data'][] {
  const { v0, v1, v2 } = customData_;
  let result: iKDJ['data'][] = [];
  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high');

  let rsvArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, FinUtil.llv(lowArr, v0), '-'), FinUtil.arrOp(FinUtil.hhv(highArr, v0), FinUtil.llv(lowArr, v0), '-'), '/'), 100, '*'),
    kArr: number[] = FinUtil.sma(rsvArr, v1, 1),
    dArr: number[] = FinUtil.sma(kArr, v2, 1),
    jArr: number[] = FinUtil.arrOp(FinUtil.arrOp(kArr, 3, '*'), FinUtil.arrOp(dArr, 2, '*'), '-');

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      k: kArr[i],
      d: dArr[i],
      j: jArr[i]
    }
  }

  return result;
}