import { iKData } from "./interface/iDatas";
import MA from "./MA";
import FinUtil from './util/FinUtil';

interface iEMV {
  param: {
    v0: number,
    v1: number
  },
  data: {
    emv: number,
    maemv: number
  }
}

export default function (arr_: iKData[], customData_: iEMV['param'] = { v0: 14, v1: 9 }): iEMV['data'][] {
  let result: iEMV['data'][] = [];

  let { v0, v1 } = customData_;

  let highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    volumeArr: number[] = FinUtil.genArrByProp(arr_, 'volume');

  let volArr: number[] = FinUtil.arrOp(MA(volumeArr, v0), volumeArr, '/'),
    hPlusLArr: number[] = FinUtil.arrOp(highArr, lowArr, '+'),
    hMinsLArr: number[] = FinUtil.arrOp(highArr, lowArr, '-'),
    midArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(hPlusLArr, FinUtil.ref(hPlusLArr, 1), '-'), hPlusLArr, '/'), 100, '*'),
    emvArr: number[] = MA(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(midArr, volArr, '*'), hMinsLArr, '*'), MA(hMinsLArr, v0), '/'), v0),
    maemvArr: number[] = MA(emvArr, v1);


  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      emv: emvArr[i],
      maemv: maemvArr[i]
    }
  }

  return result;
}