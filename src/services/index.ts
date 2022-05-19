import axios, { AxiosResponse } from 'axios'

interface SinaKData {
  day: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export default {
  async getStockData(): Promise<SinaKData[]> {
    const jsonpVar: string = '_' + Math.random().toString(36).substring(2) + Date.now();
    const URL = `https://quotes.sina.cn/cn/api/jsonp.php/var%20${jsonpVar}=/CN_MarketDataService.getKLineData?symbol=sh000001&scale=240&ma=no&datalen=90`;
    const data = await xh5_varLoader(URL, jsonpVar)
    return data;
  }
}

function xh5_varLoader(url_: string, jsonpVar: string): Promise<SinaKData[]> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url_
    script.onload = () => {
      const v = (window as { [key: string]: any })[jsonpVar] as [];
      resolve(v)
    }
    script.onerror = () => {
      reject()
    }
    document.body.appendChild(script)
  });
}