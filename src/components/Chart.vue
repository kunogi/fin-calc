<template >
  <div class="chart" ref="chartRef"></div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

export default defineComponent({
  props: {
    option: Object,
  },
  setup(props) {
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
      chart.setOption(props.option as any);
    }

    async function getData() {
      const { data } = await axios({
        method: 'get',
        url: (props.option as any).dataSource,
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
            encode: {
              x: 'day',
              y: 'close'
            }
          }, {
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