import { iKData } from './interface/iDatas';
import FinUtil from './util/FinUtil';
import EMA from './EMA';
import MA from './MA';

interface iTRIX {
  param: {
    v0: number,
    v1: number
  },
  data: {
    trix: number,
    matrix: number
  }
}

export default function (arr_: iKData[], customData_: iTRIX['param'] = { v0: 12, v1: 9 }): iTRIX['data'][] {
  const { v0, v1 } = customData_;
  let result: iTRIX['data'][] = [];
  let propArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    trAr: number[] = EMA(EMA(EMA(propArr, v0), v0), v0),
    tr1Arr: number[] = FinUtil.ref(trAr, 1),
    trixArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(trAr, tr1Arr, '-'), tr1Arr, '/'), 100, '*'),
    matrixArr: number[] = MA(trixArr, v1);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      trix: trixArr[i],
      matrix: matrixArr[i]
    }
  }
  return result;
}