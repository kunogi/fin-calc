import { iKData } from './interface/iDatas';
import FinUtil from "./util/FinUtil";
import MA from './MA';

interface iCCI {
  param: {
    v0: number
  },
  data: {
    cci: number
  }
}

export default function (arr_: iKData[], customeData_: iCCI['param'] = { v0: 14 }): iCCI['data'][] {
  let result: iCCI['data'][] = [];

  const { v0 } = customeData_;

  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    typArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(highArr, lowArr, '+'), closeArr, '+'), 3, '/'),
    cciArr: number[] = FinUtil.arrOp(FinUtil.arrOp(typArr, MA(typArr, v0), '-'), FinUtil.arrOp(FinUtil.avedev(typArr, v0), 0.015, '*'), '/');

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      cci: cciArr[i]
    }
  }

  return result;
}