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

export default function (arr_: iKData[], customeData_: iBIAS['param'] = { v0: 6, v1: 12, v2: 24 }) {
  let result: iBIAS['data'][] = [];

  const { v0, v1, v2 } = customeData_;

  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    bias1Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, MA(closeArr, v0), '-'), MA(closeArr, v0), '/'), 100, '*'),
    bias2Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, MA(closeArr, v1), '-'), MA(closeArr, v1), '/'), 100, '*'),
    bias3Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, MA(closeArr, v2), '-'), MA(closeArr, v2), '/'), 100, '*');

  for (let i:number = 0, l:number = arr_.length; i < l; i++) {
    result[i] = {
      bias1: bias1Arr[i],
      bias2: bias2Arr[i],
      bias3: bias3Arr[i]
    }
  }

  return result;
}