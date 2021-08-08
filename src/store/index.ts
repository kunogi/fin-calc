import { nextTick } from 'vue'
import { createStore } from 'vuex'

export default createStore({
  state: {
    chartOpts: <any>[]
  },
  mutations: {
    async newChart(state, info) {
      const initOpt = {
        id: Date.now(),
        title: {
          text: info.indicatorType
        },
        tooltip: {
          trigger: 'axis'
        },

        xAxis: {
          type: 'category',
          data: info.dates
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: info.drawingDatas
      };

      state.chartOpts.push(initOpt)

      //manully resize to relocate all the exising charts:
      await nextTick();
      const event = document.createEvent("HTMLEvents");
      event.initEvent("resize", true, true);
      window.dispatchEvent(event);
    }
  },
  actions: {
    async newChart(context, chartInfo) {
      const { indicatorType, stockData } = chartInfo;
      const { default: indicatorFn } = await import(`@/lib/${indicatorType}.ts`)
      const indicatorData = indicatorFn(stockData);
      const { drawingDatas, dates } = handleData(indicatorData);
      context.commit('newChart', { drawingDatas, dates, indicatorType });
    }
  },
  modules: {

  }
})

function handleData(indicatorData: any) {
  const target = [];

  const dates = [];
  for (let i = 0; i < indicatorData.length; i++) {
    dates.push(indicatorData[i].date);
  }

  const sample = indicatorData[0];
  for (const k in sample) {
    if (k === 'date') continue;

    const arr: number[] = [];
    target.push({
      name: k,
      type: 'line',
      symbol: 'none',
      encode: {
        x: 'date'
      },
      data: arr
    })
  }

  for (let j = 0; j < target.length; j++) {
    const one = target[j];
    const name = one.name;
    for (let i = 0; i < indicatorData.length; i++) {
      const data = indicatorData[i];
      one.data.push(data[name]);
    }
  }
  return { drawingDatas: target, dates: dates };
}