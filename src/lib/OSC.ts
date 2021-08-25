import { iKData } from './interface/iDatas'
import MA from './MA'
import ema from './EMA'
import FinUtil from './util/FinUtil'

interface iOSC {
  param: {
    prop: string,
    date: string,
    v0: number,
    v1: number
  },
  data: {
    date: unknown,
    osc: number,
    oscema: number
  }
}

/**
 * @description
OSC = 100 * (CLOSE - MA(CLOSE, N))
OSCEMA = EXPMEMA(OSC, M)
 * */
export default function (arr_: iKData[], customData_: iOSC['param'] = { v0: 20, v1: 6, date: 'day', prop: 'close' }): iOSC['data'][] {
  const result: iOSC['data'][] = [];

  const { prop, v0: N, v1: M, date } = customData_;

  const arr: number[] = FinUtil.genArrByProp(arr_, prop, Number);
  const dateArr: unknown[] = FinUtil.genArrByProp(arr_, date);

  //OSC = 100 * (CLOSE - MA(CLOSE, N))
  const osc: number[] = FinUtil.arrOp(FinUtil.arrOp(arr, MA(arr, N), '-'), 100, '*');
  //OSCEMA = EXPMEMA(OSC, M)
  const oscema: number[] = ema(osc, M);

  for (let i = 0, l = arr_.length; i < l; i++) {
    result[i] = {
      date: dateArr[i],
      osc: osc[i],
      oscema: oscema[i]
    }
  }

  return result;
}