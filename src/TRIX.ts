import { iKData } from './interface/iDatas';
import FinUtil from './util/FinUtil';
import EMA from './EMA';
import MA from './MA';

interface iTRIX {
  param: {
    prop: string,
    v0: number,
    v1: number
  },
  data: {
    trix: number,
    matrix: number
  }
}

/**
 * @description
  TR = EMA(EMA(EMA(CLOSE, P), P), P)
  TR1 = REF(TR, 1)
  TRIX = (TR - TR1) / TR1 * 100
  TRMA = MA(TRIX, N)
 * @param arr_
 * @param customData_
 * @returns
 */
export default function (arr_: iKData[], customData_: iTRIX['param'] = { prop: 'close', v0: 12, v1: 9 }): iTRIX['data'][] {
    const result: iTRIX['data'][] = [];

    const { prop, v0: P, v1: N } = customData_;

    const propArr: number[] = FinUtil.genArrByProp(arr_, prop);

    // EMA(EMA(EMA(CLOSE, P), P), P):
    const trArr: number[] = EMA(EMA(EMA(propArr, P), P), P);
    const tr1Arr: number[] = FinUtil.ref(trArr, 1);
    const trixArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(trArr, tr1Arr, '-'), tr1Arr, '/'), 100, '*');
    const matrixArr: number[] = MA(trixArr, N);

    for (let i: number = 0, l: number = arr_.length; i < l; i++) {
        result[i] = {
            trix: trixArr[i],
            matrix: matrixArr[i],
        };
    }

    return result;
}