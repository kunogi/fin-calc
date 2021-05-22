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
  const { v0, v1 } = customeData_;
  let result: iWVAD['data'][] = [];
  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    _openArr: number[] = FinUtil.genArrByProp(arr_, 'open'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    _volArr: number[] = FinUtil.genArrByProp(arr_, 'volume');

  let _wvadArr: number[] = FinUtil.arrOp(FinUtil.sum(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, _openArr, '-'), FinUtil.arrOp(highArr, lowArr, '-'), '/'), _volArr, '*'), v0), 1e4, '/'),
    _maxvadArr: number[] = MA(_wvadArr, v1);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      wvad: _wvadArr[i],
      wvadma: _maxvadArr[i]
    };
  }
  return result;
}