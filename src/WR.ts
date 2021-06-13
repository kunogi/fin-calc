import FinUtil from './util/FinUtil';
import { iKData } from './interface/iDatas';

interface iWR {
  param: {
    v0: number,
    v1: number
  },
  data: {
    wr1: number,
    wr2: number
  }
}

export default function (arr_: iKData[], customData_: iWR['param'] = { v0: 1, v1: 0 }): iWR['data'][] {
  let result: iWR['data'][] = [];
  
  const { v0, v1 } = customData_;
  
  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    wr1Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(FinUtil.hhv(highArr, v0), closeArr, '-'), 100, '*'), FinUtil.arrOp(FinUtil.hhv(highArr, v0), FinUtil.llv(lowArr, v0), '-'), '/'),
    wr2Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(FinUtil.hhv(highArr, v1), closeArr, '-'), 100, '*'), FinUtil.arrOp(FinUtil.hhv(highArr, v1), FinUtil.llv(lowArr, v1), '-'), '/');

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      wr1: wr1Arr[i],
      wr2: wr2Arr[i]
    }
  }

  return result;
}