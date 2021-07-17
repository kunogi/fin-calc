import FinUtil from './util/FinUtil';
import MA from './MA';

interface iROC {
  param: {
    prop: string,
    v0: number, // N
    v1: number// M
  },
  data: {
    roc: number,
    maroc: number
  }
}

/**
 *
 * @param arr_
 * @param customData_
 * @returns
 * @description
  ROC = (CLOSE - REF(CLOSE, N)) / REF(CLOSE, N) * 100
  ROCMA = MA(ROC, M)
 */

export default function (arr_: number[], customData_: iROC['param'] = { prop: 'close', v0: 12, v1: 6 }): iROC['data'][] {
  const result: iROC['data'][] = [];

  const { prop, v0: N, v1: M } = customData_;

  const arr: number[] = FinUtil.genArrByProp(arr_, prop);

  // ROC = (CLOSE - REF(CLOSE, N)) / REF(CLOSE, N) * 100:
  const refArr: number[] = FinUtil.ref(arr, N);
  const rocArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(arr, refArr, '-'), refArr, '/'), 100, '*');
  const marocArr: number[] = MA(rocArr, M);

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      roc: rocArr[i],
      maroc: marocArr[i]
    };
  }

  return result;
}