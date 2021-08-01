<template>
  <div class="container">
    <div class="chart"></div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  setup () {
    onMounted(() => {
      console.log('chart onMounted', document.querySelector('.chart'))
      const chart = echarts.init(document.querySelector('.chart') as HTMLElement)
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      chart.setOption(option)
    })
  }

})
</script>
<style scoped>
#chart {
  height: 300px;
  width: 300px;
}
</style>