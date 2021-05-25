import { iKData } from "./interface/iDatas";
import MA from "./MA";
import FinUtil from "./util/FinUtil";

interface iASI {
  param: {
    v0: number,
    v1: number
  },
  data: {
    asi: number,
    asit: number
  }
}

export default function (arr_: iKData[], customData_: iASI['param'] = { v0: 26, v1: 10 }): iASI['data'][] {
  let result: iASI['data'][] = [];

  const { v0, v1 } = customData_;

  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    openArr: number[] = FinUtil.genArrByProp(arr_, 'open');

  let lcArr: number[] = FinUtil.ref(closeArr, 1),
    aaArr: number[] = FinUtil.abs(FinUtil.arrOp(highArr, lcArr, '-')),
    bbArr: number[] = FinUtil.abs(FinUtil.arrOp(lowArr, lcArr, '-')),
    ccArr: number[] = FinUtil.abs(FinUtil.arrOp(highArr, FinUtil.ref(lowArr, 1), '-')),
    ddArr: number[] = FinUtil.abs(FinUtil.arrOp(lcArr, FinUtil.ref(openArr, 1), '-'));

  let rArr: number[] = [];
  for (let i: number = 0, l: number = aaArr.length; i < l; i++) {
    if (aaArr[i] > bbArr[i] && aaArr[i] > ccArr[i]) {
      rArr.push(aaArr[i] + bbArr[i] / 2 + ddArr[i] / 4);
    } else {
      if (bbArr[i] > ccArr[i] && bbArr[i] > aaArr[i]) {
        rArr.push(bbArr[i] + aaArr[i] / 2 + ddArr[i] / 4);
      } else {
        rArr.push(ccArr[i] + ddArr[i] / 4);
      }
    }
  }

  let xArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(closeArr, lcArr, '-'), FinUtil.arrOp(FinUtil.arrOp(closeArr, openArr, '-'), 2, '/'), '+'), lcArr, '+'), FinUtil.ref(openArr, 1), '-'),
    siArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(xArr, 16, '*'), rArr, '/'), FinUtil.max(aaArr, bbArr), '*'),
    asiArr: number[] = FinUtil.sum(siArr, v0),
    asitArr: number[] = MA(asiArr, v1);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      asi: asiArr[i],
      asit: asitArr[i]
    }
  }

  return result;
}