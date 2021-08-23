import { EChartsOption } from 'echarts'
import { createStore } from 'vuex'
import { NEW_CHART } from './mutation-types'
import { nextTick } from 'vue'

export default createStore({
  state: {
    chartOpts: <EChartsOption | any>[]
  },
  mutations: {
    [NEW_CHART](state, option) {
      state.chartOpts.push(option);
    }
  },
  actions: {
    async [NEW_CHART](context, chartInfo) {
      const { indicatorType, stockData } = chartInfo;
      const { default: indicatorFn } = await import(`@/lib/${indicatorType.toUpperCase()}.ts`);
      const indicatorData = indicatorFn(stockData);
      //generate key array and get rid of date field (x axis):
      const sample = indicatorData[0];
      const otherKeys = Object.keys(sample).filter(k => k !== 'date');
      const option: EChartsOption = {
        id: Date.now() * Math.floor(Math.random() * 1e5 + 1),
        title: {
          text: indicatorType
        },
        tooltip: {
          trigger: 'axis'
        },
        dataset: {
          sourceHeader: false,
          source: indicatorData
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          scale: true
        },
        series: otherKeys.map(k => {
          return {
            type: 'line',
            //encode: { x: 'date', y: k },//echarts recognize the datas here
            symbol: 'none',
            lineStyle: {
              width: 1
            }
          }
        })
      };

      context.commit(NEW_CHART, option);

      //manully resize to relocate all the exising charts:
      nextTick(function () {
        const event = document.createEvent("HTMLEvents");
        event.initEvent("resize", true, true);
        window.dispatchEvent(event);
      })
    }
  },
  modules: {

  }
})