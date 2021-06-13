import FinUtil from './util/FinUtil';
import { iKData } from './interface/iDatas';
import MA from "./MA";

interface iWVAD {
  param: {
    v0: number,
    v1: number
  },
  data: {
    wvad: number,
    wvadma: number
  }
}

export default function (arr_: iKData[], customeData_: iWVAD['param'] = { v0: 24, v1: 6 }): iWVAD['data'][] {
  let result: iWVAD['data'][] = [];

  const { v0, v1 } = customeData_;
  
  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    openArr: number[] = FinUtil.genArrByProp(arr_, 'open'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    volArr: number[] = FinUtil.genArrByProp(arr_, 'volume');

  let wvadArr: number[] = FinUtil.arrOp(FinUtil.sum(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, openArr, '-'), FinUtil.arrOp(highArr, lowArr, '-'), '/'), volArr, '*'), v0), 1e4, '/'),
    maxvadArr: number[] = MA(wvadArr, v1);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      wvad: wvadArr[i],
      wvadma: maxvadArr[i]
    }
  }

  return result;
}