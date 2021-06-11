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

/**
 * 
 * @param arr_ 
 * @param customData_ 
 * @returns 
 * @description
  ROC = (CLOSE-REF(CLOSE,N))/REF(CLOSE,N)*100
  ROCMA=MA(ROC,M)
 */
export default function (arr_: number[], customData_: iROC['param'] = { prop: 'close', v0: 12, v1: 6 }): iROC['data'][] {
  let result: iROC['data'][] = [];

  const { prop, v0: N, v1: M } = customData_;

  let arr: number[] = FinUtil.genArrByProp(arr_, prop);

  //ROC = (CLOSE-REF(CLOSE,N))/REF(CLOSE,N)*100:
  let refArr: number[] = FinUtil.ref(arr, N);
  let rocArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(arr, refArr, '-'), refArr, '/'), 100, '*'),
    marocArr:number[] = MA(rocArr, M);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      roc: rocArr[i],
      maroc: marocArr[i]
    }
  }

  return result;
}