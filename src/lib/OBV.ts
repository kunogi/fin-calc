import { iKData } from './interface/iDatas'

interface iOBV {
  param: {
    v0: number
  },
  data: {
    date: unknown,
    obv: number,
    obvma: number
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
  const result: iOBV['data'][] = []

  const { v0 } = customData_

  let data: iKData = arr_[0]
  let va: number = data.volume
  let obv: number = va
  let sumMa: number = obv

  result.push({
    date: data.day,
    obv: obv,
    obvma: obv
  })

  for (let i = 1, l = arr_.length; i < l; i++) {
    data = arr_[i]
    const obj: iOBV['data'] = {
      date: data.day,
      obv: 0,
      obvma: 0
    }
    result.push(obj)

    if (data.close > arr_[i - 1].close) {
      va = Number(data.volume)
    } else if (data.close === arr_[i - 1].close) {
      va = 0
    } else {
      va = -Number(data.volume)
    }

    obv = va + result[i - 1].obv
    obj.obv = obv
    sumMa += obv
    if (i >= v0) {
      sumMa -= result[i - v0].obv
      obj.obvma = sumMa / v0
    } else {
      obj.obvma = sumMa / (i + 1)
    }
  }

  return result
}