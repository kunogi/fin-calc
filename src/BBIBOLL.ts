import FinUtil from './util/FinUtil';
import { iKData } from './interface/iDatas';
import MA from './MA';

interface iBBIBOLL {
  param: {
    prop: string,
    v0: number,
    v1: number
  },
  data: {
    bbiboll: number,
    upr: number,
    dwn: number
  }
}
export default function (arr_: iKData[], customData_: iBBIBOLL['param'] = { prop: 'close', v0: 11, v1: 6 }): iBBIBOLL['data'][] {
  const { prop, v0, v1 } = customData_;
  let result: iBBIBOLL['data'][] = [];
  let closeArr: number[] = FinUtil.genArrByProp(arr_, prop),
    bbiArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(MA(closeArr, 3), MA(closeArr, 6), '+'), MA(closeArr, 12), '+'), MA(closeArr, 24), '+'), 4, '/'),
    uprArr: number[] = FinUtil.arrOp(bbiArr, FinUtil.arrOp(FinUtil.std(bbiArr, v0), v1, '*'), '+'),
    dwnArr: number[] = FinUtil.arrOp(bbiArr, FinUtil.arrOp(FinUtil.std(bbiArr, v0), v1, '*'), '-');
  for (var i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      bbiboll: bbiArr[i],
      upr: uprArr[i],
      dwn: dwnArr[i]
    }
  }
  return result;
}