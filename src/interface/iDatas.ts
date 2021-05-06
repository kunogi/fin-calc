export interface iKData {
  open: number,
  high: number,
  low: number,
  close: number,
  prevclose: number,
  volume: number,
  date: string
}

export interface iMACD {
  data: {
    dif: number,
    dea: number,
    bar: number
  },
  param: {
    prop: string,
    v0: number,
    v1: number,
    v2: number
  }
}

export interface iOBV {
  data: {
    obv: number,
    obvma: number
  },
  param: {
    v0: number
  }
}