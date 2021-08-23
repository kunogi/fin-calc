<template>
  <new-chart />

  <draggable
    v-model="store.state.chartOpts"
    group="charts"
    item-key="id"
    class="container"
    @start="onDragStart"
    @end="onDragEnd"
  >
    <template #item="{ element }">
      <chart :key="element.id" :option="element" />
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Chart from '@/components/Chart.vue'
import NewChart from '@/components/NewChart.vue'
import store from '@/store'
import draggable from 'vuedraggable'

export default defineComponent({
  components: {
    Chart,
    NewChart,
    draggable
  },

  setup() {
    const drag = ref(false);

    function onDragStart() {
      drag.value = true;
    }

    function onDragEnd() {
      drag.value = false;
    }

    return {
      store,
      onDragStart,
      onDragEnd,
      drag
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
  width: 90vw;
  height: 90vh;
}
</style>