import { iKData } from './interface/iDatas';
import MA from './MA';
import FinUtil from './util/FinUtil';

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
  const result: iASI['data'][] = [];

  const { v0, v1 } = customData_;

  const closeArr: number[] = FinUtil.genArrByProp(arr_, 'close');
  const highArr: number[] = FinUtil.genArrByProp(arr_, 'high');
  const lowArr: number[] = FinUtil.genArrByProp(arr_, 'low');
  const openArr: number[] = FinUtil.genArrByProp(arr_, 'open');

  const lcArr: number[] = FinUtil.ref(closeArr, 1);
  const aaArr: number[] = FinUtil.abs(FinUtil.arrOp(highArr, lcArr, '-'));
  const bbArr: number[] = FinUtil.abs(FinUtil.arrOp(lowArr, lcArr, '-'));
  const ccArr: number[] = FinUtil.abs(FinUtil.arrOp(highArr, FinUtil.ref(lowArr, 1), '-'));
  const ddArr: number[] = FinUtil.abs(FinUtil.arrOp(lcArr, FinUtil.ref(openArr, 1), '-'));

  const rArr: number[] = [];
  for (let i = 0, l: number = aaArr.length; i < l; i++) {
    if (aaArr[i] > bbArr[i] && aaArr[i] > ccArr[i]) {
      rArr.push(aaArr[i] + bbArr[i] / 2 + ddArr[i] / 4);
    } else if (bbArr[i] > ccArr[i] && bbArr[i] > aaArr[i]) {
      rArr.push(bbArr[i] + aaArr[i] / 2 + ddArr[i] / 4);
    } else {
      rArr.push(ccArr[i] + ddArr[i] / 4);
    }
  }

  const xArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(
    FinUtil.arrOp(closeArr, lcArr, '-'), FinUtil.arrOp(FinUtil.arrOp(closeArr, openArr, '-'), 2, '/'), '+'), lcArr, '+'),
  FinUtil.ref(openArr, 1), '-');
  const siArr: number[] = FinUtil.arrOp(FinUtil.arrOp(FinUtil.arrOp(xArr, 16, '*'), rArr, '/'), FinUtil.max(aaArr, bbArr), '*');
  const asiArr: number[] = FinUtil.sum(siArr, v0);
  const asitArr: number[] = MA(asiArr, v1);

  for (let i = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      asi: asiArr[i],
      asit: asitArr[i]
    };
  }

  return result;
}