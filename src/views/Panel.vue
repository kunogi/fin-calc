<template>
  <new-chart />

  <ul class="container">
    <chart v-for="c in charts" :key="c" />
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Chart from '@/components/Chart.vue'
import NewChart from '@/components/NewChart.vue'

export default defineComponent({
  components: {
    Chart,
    NewChart
  },
  setup() {
    const charts: number[] = reactive([]);

    return {
      charts
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