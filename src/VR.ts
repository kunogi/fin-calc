import { iKData } from "./interface/iDatas";
import MA from "./MA";
import FinUtil from './util/FinUtil';

interface iVR {
  param: {
    prop:string,
    v0: number,
    v1: number
  },
  data: {
    vr: number,
    mavr: number
  }
}

export default function (arr_: iKData[], customData_: iVR['param'] = {prop:'close', v0: 26, v1: 6 }):iVR['data'][] {
  let result: iVR['data'][] = [];

  const { prop,v0, v1 } = customData_;

  let propArr: number[] = FinUtil.genArrByProp(arr_, prop),
    volumeArr: number[] = FinUtil.genArrByProp(arr_, 'volume');

  let ref1Arr: number[] = FinUtil.ref(propArr, 1),
    thArr: number[] = [],
    tlArr: number[] = [],
    tqArr: number[] = [];
  for (let i: number = 0, l: number = propArr.length; i < l; i++) {
    thArr.push(propArr[i] > ref1Arr[i] ? volumeArr[i] : 0);
    tlArr.push(propArr[i] < ref1Arr[i] ? volumeArr[i] : 0);
    tqArr.push(propArr[i] == ref1Arr[i] ? volumeArr[i] : 0);
  }
  thArr = FinUtil.sum(thArr, v0);
  tlArr = FinUtil.sum(tlArr, v0);
  tqArr = FinUtil.sum(tqArr, v0);

  let vrArr = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(thArr, 2, '*'), tqArr, '+'), 100, '*'), FinUtil.arrOp(FinUtil.arrOp(tlArr, 2, '*'), tqArr, '+'), '/');
  let mavrArr = MA(vrArr, v1);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      vr: vrArr[i],
      mavr: mavrArr[i]
    }
  }

  return result;
}