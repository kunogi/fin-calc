import { iKData } from './interface/iDatas';

interface iOBV {
  data: {
    obv: number,
    obvma: number
  },
  param: {
    v0: number
  }
}

/**
 * 
 * @description OBV, On Balance Volume
 * @param arr_ 
 * @param customData_ 
 * @returns 
 */
export default function (arr_: iKData[], customData_: iOBV['param'] = { v0: 30 }): iOBV['data'][] {
  const { v0 } = customData_;
  let result: iOBV['data'][] = [];
  let data: iKData = arr_[0];
  let va: number = data.volume;
  let obv: number = va;
  let sumMa: number = obv;
  result.push({
    obv: obv,
    obvma: obv
  });
  for (let i: number = 1, l: number = arr_.length; i < l; i++) {
    data = arr_[i];
    let obj: iOBV['data'] = { obv: NaN, obvma: NaN };
    result.push(obj);

    if (data.close > arr_[i - 1].close) va = Number(data.volume);
    else if (data.close == arr_[i - 1].close) va = 0;
    else va = -Number(data.volume);

    obv = va + result[i - 1].obv;
    obj.obv = obv;
    sumMa += obv;
    if (i >= v0) {
      sumMa -= result[i - v0].obv;
      obj.obvma = sumMa / v0;
    } else obj.obvma = sumMa / (i + 1);
  }

  return result;
}