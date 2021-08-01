import { createStore } from 'vuex'

export default createStore({
  state: {
    chartOpts: <any>[]
  },
  mutations: {
    newChart(state, chartInfo) {
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