import { iKData } from "./interface/iDatas";
import MA from "./MA";
import FinUtil from './util/FinUtil';

interface iEMV {
  param: {
    v0: number,//N
    v1: number//N1
  },
  data: {
    emv: number,
    maemv: number
  }
}

/**
 * 
 * @param arr_ 
 * @param customData_ 
 * @returns 
 * @description
  VOLUME=MA(VOL,N)/VOL
  MID=100*(HIGH+LOW-REFV(HIGH+LOW,1))/(HIGH+LOW)
  EMV=MA(MID*VOLUME*(HIGH-LOW)/MA(HIGH-LOW,N),N)
  EMVA=MA(EMV,N1)
 */
export default function (arr_: iKData[], customData_: iEMV['param'] = { v0: 14, v1: 9 }): iEMV['data'][] {
  let result: iEMV['data'][] = [];

  const { v0, v1 } = customData_;

  let highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    volumeArr: number[] = FinUtil.genArrByProp(arr_, 'volume');

  let volArr: number[] = FinUtil.arrOp(MA(volumeArr, v0), volumeArr, '/'),
    hPlusLArr: number[] = FinUtil.arrOp(highArr, lowArr, '+'),
    hMinsLArr: number[] = FinUtil.arrOp(highArr, lowArr, '-');

  //MID=100*(HIGH+LOW-REFV(HIGH+LOW,1))/(HIGH+LOW):
  let midArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(hPlusLArr, FinUtil.ref(hPlusLArr, 1), '-'), hPlusLArr, '/'), 100, '*');
  //EMV=MA(MID*VOLUME*(HIGH-LOW)/MA(HIGH-LOW,N),N):
  let emvArr: number[] = MA(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(midArr, volArr, '*'), hMinsLArr, '*'), MA(hMinsLArr, v0), '/'), v0),
    maemvArr: number[] = MA(emvArr, v1);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      emv: emvArr[i],
      maemv: maemvArr[i]
    }
  }

  return result;
}