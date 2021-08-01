<template >
  <div class="chart" ref="chartRef"></div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

export default defineComponent({
  setup() {
    let chart: echarts.ECharts;
    const chartRef = ref();
    const state = reactive({
      data: [],
    });

    onMounted(async () => {
      initChart();
      await getData();
      updateChart();
      onResize();
      window.addEventListener('resize', onResize);
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    })

    function initChart() {
      chart = echarts.init(chartRef.value);
      const initOpt = {
        title: {
          text: 'chart title'
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
            name: '价格',
            type: 'value',
            scale: true
          }, {
            name: '量',
            type: 'value',
            scale: true
          }
        ],
        dataZoom: [{
          type: 'inside',
          xAxisIndex: 0
        }/*, {
          type: 'slider',
          yAxisIndex: 0
        } */
        ],
        series: [
          {
            name: '收盘价',
            type: 'line',
            yAxisIndex: 0,
            showSymbol: false,
            markPoint: {
              data: [{
                type: 'max'
              },
              {
                type: 'min'
              }]
            },
            markLine: {
              data: [
                {
                  type: 'average'
                }
              ]
            }
          }, {
            name: '成交量',
            type: 'bar',
            label: {
              // show: true,
              position: 'top',
              color: '#f00'
            },
            itemStyle: {
              borderRadius: [90, 90, 0, 0]
            },
            yAxisIndex: 1,
            showSymbol: false
          }]
      };
      chart.setOption(initOpt);
    }

    async function getData() {
      const { data } = await axios({
        method: 'get',
        baseURL: '_PROXYAPI_',
        url: '/cn/api/json.php/CN_MarketDataService.getKLineData',
        params: {
          symbol: 'sh000001',
          scale: 240,
          ma: 'no',
          datalen: 260
        }
      });
      state.data = data;
    }

    function updateChart() {
      const { data } = state;
      const option = {
        dataset: {
          sourceHeader: false,
          dimensions: ['day', 'open', 'high', 'low', 'close', 'volume'],
          source: data
        },
        series: [
          {
            name: '收盘价',
            encode: {
              x: 'day',
              y: 'close'
            }
          }, {
            name: '成交量',
            encode: {
              x: 'day',
              y: 'volume'
            }
          }]
      }
      chart.setOption(option);
    }

    function onResize() {
      const resizeOpt = {};
      chart.setOption(resizeOpt);
      chart.resize();
    }

    return {
      state,
      chartRef
    }
  }
})
</script>

<style scoped>
.chart {
  width: 300px;
  height: 300px;
  flex-grow: 1;
}
</style>