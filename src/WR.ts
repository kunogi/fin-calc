import FinUtil from './util/FinUtil';
import { iKData } from './interface/iDatas';

interface iWR {
  param: {
    prop: string,
    v0: number,
    v1: number
  },
  data: {
    wr1: number,
    wr2: number
  }
}

export default function (arr_: iKData[], customData_: iWR['param'] = { prop: 'close', v0: 1, v1: 0 }): iWR['data'][] {
    const result: iWR['data'][] = [];

    const { prop, v0, v1 } = customData_;

    const closeArr: number[] = FinUtil.genArrByProp(arr_, prop);
    const highArr: number[] = FinUtil.genArrByProp(arr_, 'high');
    const lowArr: number[] = FinUtil.genArrByProp(arr_, 'low');

    const wr1Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(
        FinUtil.hhv(highArr, v0), closeArr, '-'), 100, '*'), FinUtil.arrOp(FinUtil.hhv(highArr, v0), FinUtil.llv(lowArr, v0), '-'), '/');
    const wr2Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(
        FinUtil.hhv(highArr, v1), closeArr, '-'), 100, '*'), FinUtil.arrOp(FinUtil.hhv(highArr, v1), FinUtil.llv(lowArr, v1), '-'), '/');

    for (let i: number = 0, l: number = arr_.length; i < l; i++) {
        result[i] = {
            wr1: wr1Arr[i],
            wr2: wr2Arr[i],
        };
    }

    return result;
}