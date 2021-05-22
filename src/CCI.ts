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
  const { v0 } = customeData_;
  let result: iCCI['data'][] = [];
  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    _typArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(highArr, lowArr, '+'), closeArr, '+'), 3, '/'),
    _cciArr: number[] = FinUtil.arrOp(FinUtil.arrOp(_typArr, MA(_typArr, v0), '-'), FinUtil.arrOp(FinUtil.avedev(_typArr, v0), 0.015, '*'), '/');


  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      cci: _cciArr[i]
    };
  }

  return result;
}