<template>
  <new-chart />
  
  <ul class="container">
    <chart v-for="opt in store.state.chartOpts" :key="opt.id" :option="opt"/>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chart from '@/components/Chart.vue'
import NewChart from '@/components/NewChart.vue'
import store from '../store'

export default defineComponent({
  components: {
    Chart,
    NewChart
  },
  setup() {
    return {
      store
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  width: 100vw;
  height: 100vh;
}
</style>