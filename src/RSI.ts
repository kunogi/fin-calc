import FinUtil from './util/FinUtil';
interface iRSI {
  param: {
    prop: string,
    v0: number,
    v1: number,
    v2: number
  },
  data: {
    rsi1: number,
    rsi2: number,
    rsi3: number
  }
}
export default function (arr_: number[], customData_: iRSI['param'] = { prop: 'close', v0: 1, v1: 2, v2: 0 }): iRSI['data'][] {
  const { prop, v0, v1, v2 } = customData_;
  let result: iRSI['data'][] = [];
  let closeArr: number[] = FinUtil.genArrByProp(arr_, prop),
    lcArr: number[] = FinUtil.ref(closeArr, 1),
    subArr: number[] = FinUtil.arrOp(closeArr, lcArr, '-'),
    maxArr: number[] = FinUtil.max(subArr, 0) as number[],
    absArr: number[] = FinUtil.abs(subArr) as number[],
    rsiArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.sma(maxArr, v0, 1), FinUtil.sma(absArr, v0, 1), '/'), 100, '*'),
    rsi2Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.sma(maxArr, v1, 1), FinUtil.sma(absArr, v1, 1), '/'), 100, '*'),
    rsi3Arr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.sma(maxArr, v2, 1), FinUtil.sma(absArr, v2, 1), '/'), 100, '*');

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      rsi1: rsiArr[i],
      rsi2: rsi2Arr[i],
      rsi3: rsi3Arr[i]
    }
  }

  return result;
}