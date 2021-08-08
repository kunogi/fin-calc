<template >
  <div class="chart" ref="chartRef" id="chart"></div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts';

export default defineComponent({
  props: {
    option: Object,
  },

  setup(props) {
    const chartRef = ref();
    let chart: echarts.ECharts;

    onMounted(() => {
      chart = echarts.init(chartRef.value);
      chart.setOption(props.option as EChartsOption);
      window.addEventListener('resize', onResize);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    })

    function onResize() {
      const resizeOpt = {};
      chart.setOption(resizeOpt);
      chart.resize();
    }

    return {
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