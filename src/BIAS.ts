import { iKData } from "./interface/iDatas";
import MA from "./MA";
import FinUtil from "./util/FinUtil";

interface iBIAS {
  param: {
    v0: number,
    v1: number,
    v2: number
  },
  data: {
    bias1: number,
    bias2: number,
    bias3: number
  }
}

/**
 * 
 * @param arr_ 
 * @param customeData_ 
 * @returns 
 * @description
  MA_V0 =MA(CLOSE,V0)
  MA_V1 =MA(CLOSE,V1)
  MA_V2 =MA(CLOSE,V2)
  BIAS1=(CLOSE-MA_V0)/MA_V0*100
  BIAS2=(CLOSE-MA_V1)/MA_V1*100
  BIAS3=(CLOSE-MA_V2)/MA_V2*100
 */
export default function (arr_: iKData[], customeData_: iBIAS['param'] = { v0: 6, v1: 12, v2: 24 }) {
  let result: iBIAS['data'][] = [];

  const { v0, v1, v2 } = customeData_;

  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close');
  let mav0: number[] = MA(closeArr, v0),
    mav1: number[] = MA(closeArr, v1),
    mav2: number[] = MA(closeArr, v2);
  let bias1Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, mav0, '-'), mav0, '/'), 100, '*'),
    bias2Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, mav1, '-'), mav1, '/'), 100, '*'),
    bias3Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, mav2, '-'), mav2, '/'), 100, '*');

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      bias1: bias1Arr[i],
      bias2: bias2Arr[i],
      bias3: bias3Arr[i]
    }
  }

  return result;
}