import FinUtil from './util/FinUtil';
import { iKData } from './interface/iDatas';
import MA from './MA';

interface iWVAD {
  param: {
    v1: number
  },
  data: {
    wvad: number,
    wvadma: number
  }
}

/**
 *
 * @param arr_
 * @param customeData_
 * @returns
 * @description
  WVAD = (CLOSE - OPEN) / (HIGH - LOW) * VOL
 */
export default function (arr_: iKData[], customeData_: iWVAD['param'] = { v1: 6 }): iWVAD['data'][] {
    const result: iWVAD['data'][] = [];

    const { v1 } = customeData_;

    const closeArr: number[] = FinUtil.genArrByProp(arr_, 'close');
    const openArr: number[] = FinUtil.genArrByProp(arr_, 'open');
    const highArr: number[] = FinUtil.genArrByProp(arr_, 'high');
    const lowArr: number[] = FinUtil.genArrByProp(arr_, 'low');
    const volArr: number[] = FinUtil.genArrByProp(arr_, 'volume');

    const wvadArr: number[] = FinUtil.arrOp(FinUtil.arrOp(
        FinUtil.arrOp(closeArr, openArr, '-'), FinUtil.arrOp(highArr, lowArr, '-'), '/'), volArr, '*');
    const maWvadArr: number[] = MA(wvadArr, v1);

    for (let i: number = 0, l: number = arr_.length; i < l; i++) {
        result[i] = {
            wvad: wvadArr[i],
            wvadma: maWvadArr[i],
        };
    }

    return result;
}