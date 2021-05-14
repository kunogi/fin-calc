import FinUtil from './util/FinUtil';
import MA from './MA';

interface iROC {
  param: {
    prop: string,
    v0: number,
    v1: number
  },
  data: {
    roc: number,
    maroc: number
  }
}
export default function (arr_: number[], customData_: iROC['param'] = { prop: 'close', v0: 12, v1: 6 }): iROC['data'][] {
  const { prop, v0, v1 } = customData_;
  let result: iROC['data'][] = [];

  let closeArr: number[] = FinUtil.genArrByProp(arr_, prop),
    rocArr = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, FinUtil.ref(closeArr, v0), '-'), 100, '*'), FinUtil.ref(closeArr, v0), '/'),
    marocArr = MA(rocArr, v1);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      roc: rocArr[i],
      maroc: marocArr[i]
    }
  }

  return result;
}