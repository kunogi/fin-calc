import FinUtil from './util/FinUtil';
import { iKData } from './interface/iDatas';
import EMA from './EMA';

interface iDMI {
  param: {
    v0: number,
    v1: number
  },
  data: {
    pdi: number,
    mdi: number,
    adx: number,
    adxr: number
  }
}

export default function (arr_: iKData[], customData_: iDMI['param'] = { v0: 14, v1: 6 }): iDMI['data'][] {
  const { v0, v1 } = customData_;
  let result: iDMI['data'][] = [];

  let closeArr: number[] = FinUtil.genArrByProp(arr_, 'close'),
    highArr: number[] = FinUtil.genArrByProp(arr_, 'high'),
    lowArr: number[] = FinUtil.genArrByProp(arr_, 'low'),
    mtrArr: number[] = EMA(
      FinUtil.max(
        FinUtil.max(
          FinUtil.arrOp(highArr, lowArr, '-'),
          FinUtil.abs(FinUtil.arrOp(highArr, FinUtil.ref(closeArr, 1), '-'))
        ),
        FinUtil.abs(FinUtil.arrOp(lowArr, FinUtil.ref(closeArr, 1), '-'))
      ), v0);

  let hdArr = FinUtil.arrOp(highArr, FinUtil.ref(highArr, 1), '-'),
    ldArr = FinUtil.arrOp(FinUtil.ref(lowArr, 1), lowArr, '-');
  let dmpArr: number[] = [], dmmArr: number[] = [];
  for (let curhd, curld, i: number = 0, l: number = hdArr.length; i < l; i++) {
    curhd = hdArr[i];
    curld = ldArr[i];
    dmpArr.push((curhd > 0 && curhd > curld) ? curhd : 0);
    dmmArr.push((curld > 0 && curld > curhd) ? curld : 0);
  }

  dmpArr = EMA(dmpArr, v0);
  dmmArr = EMA(dmmArr, v0);

  let pdiArr: number[] = FinUtil.arrOp(FinUtil.arrOp(dmpArr, 100, '*'), mtrArr, '/'),
    mdiArr: number[] = FinUtil.arrOp(FinUtil.arrOp(dmmArr, 100, '*'), mtrArr, '/'),
    adxArr: number[] = EMA(FinUtil.arrOp(FinUtil.arrOp(FinUtil.abs(FinUtil.arrOp(mdiArr, pdiArr, '-')), FinUtil.arrOp(mdiArr, pdiArr, '+'), '/'), 100, '*'), v1),
    adxrArr: number[] = EMA(adxArr, v1);

  for (let i: number = 0, l: number = arr_.length; i < l; i++) {
    result[i] = {
      pdi: pdiArr[i],
      mdi: mdiArr[i],
      adx: adxArr[i],
      adxr: adxrArr[i]
    }
  }

  return result;
}