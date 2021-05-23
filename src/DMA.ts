import { iKData } from "./interface/iDatas";
import FinUtil from './util/FinUtil';
import MA from './MA';

interface iDMA {
  param: {
    v0: number,
    v1: number,
    v2: number
  },
  data: {
    dif: number,
    difma: number
  }
}

export default function (arr_: iKData[], customeData_: iDMA['param'] = { v0: 10, v1: 50, v2: 10 }) {
  let result: iDMA['data'][] = [];

  const { v0, v1, v2 } = customeData_;

  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    maArr1: number[] = MA(closeArr, v0),
    maArr2: number[] = MA(closeArr, v1),
    difArr: number[] = FinUtil.arrOp(maArr1, maArr2, '-'),
    amaArr: number[] = MA(difArr, v2);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      dif: difArr[i],
      difma: amaArr[i]
    }
  }

  return result;
}