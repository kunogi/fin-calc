import { nextTick } from 'vue'
import { createStore } from 'vuex'

export default createStore({
  state: {
    chartOpts: <any>[]
  },
  mutations: {
    async newChart(state, chartInfo) {
      const initOpt = {
        id: Date.now(),
        dataSource: chartInfo.dataSource,
        title: {
          text: chartInfo.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        grid: {
          containLabel: true,
          top: '10%',
          right: '2%',
          bottom: '2%',
          left: '2%'
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: [
          {
            type: 'value',
            scale: true
          }, {
            type: 'value',
            scale: true
          }
        ],
        dataZoom: [{
          type: 'inside',
          xAxisIndex: 0
        }],
        series: [
          {
            type: chartInfo.chartType,
            yAxisIndex: 0,
            showSymbol: false
          }
        ]
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
    newChart(context, chartInfo) {
      context.commit('newChart', chartInfo);
    }
  },
  modules: {

  }
})