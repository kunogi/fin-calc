import FinUtil from './util/FinUtil';
import MA from './MA';

interface iBOLL {
  param: {
    v0: number,
    v1: number
  },
  data: {
    boll: number | null,
    upper: number,
    lower: number
  }
}

export default function (arr_: number[], customData_: iBOLL['param'] = { v0: 20, v1: 2 }): iBOLL['data'][] {
  const { v0, v1 } = customData_;
  let result: iBOLL['data'][] = new Array(arr_.length),
    arr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    bollArr: (number | null)[] = MA(arr, v0),
    stdArr: number[] = FinUtil.arrOp(FinUtil.std(arr, v0), v1, '*'),
    upArr: number[] = FinUtil.arrOp(bollArr, stdArr, '+'),
    downArr: number[] = FinUtil.arrOp(bollArr, stdArr, '-');
  for (let i: number = 0, l: number = arr.length; i < l; i++) {
    result[i] = {
      boll: bollArr[i],
      upper: upArr[i],
      lower: downArr[i]
    }
  }
  return result;
}