import axios, { AxiosResponse } from 'axios'

export default {
  getStockData(): Promise<AxiosResponse> {
    const URL = '/_SINAPROXY_/cn/api/json.php/CN_MarketDataService.getKLineData';
    return axios.get(URL, {
      params: {
        symbol: 'sh000001',
        scale: 240,
        ma: 'no',
        datalen: 90
      }
    });
  }
}