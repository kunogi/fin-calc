import { iKData } from './interface/iDatas';
import FinUtil from "./util/FinUtil";
import MA from './MA';

interface iCCI {
  param: {
    v0: number//N
  },
  data: {
    cci: number
  }
}

/**
 * 
 * @param arr_ 
 * @param customeData_ 
 * @returns 
 * @description
  TYP = (HIGH + LOW + CLOSE) / 3
  CCI = (TYP - MA(TYP, N)) / (0.015 * AVEDEV(TYP, N))
 */
export default function (arr_: iKData[], customeData_: iCCI['param'] = { v0: 14 }): iCCI['data'][] {
  let result: iCCI['data'][] = [];

  const { v0: N } = customeData_;

  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low');

  let typArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(highArr, lowArr, '+'), closeArr, '+'), 3, '/'),
    //(TYP-MA(TYP,N)) / (0.015*AVEDEV(TYP,N)):
    cciArr: number[] = FinUtil.arrOp(
      FinUtil.arrOp(typArr, MA(typArr, N), '-'),
      FinUtil.arrOp(FinUtil.avedev(typArr, N), 0.015, '*'), '/'
    );

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      cci: cciArr[i]
    }
  }

  return result;
}