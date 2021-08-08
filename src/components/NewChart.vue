<template>
  <el-button @click="drawer = true" type="primary" icon='el-icon-plus'>Add Indicator</el-button>

  <el-drawer title="New Chart" v-model="drawer" :direction="direction" destroy-on-close>
    <indicator-selector :stockData="stockData" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IndicatorSelector from './IndicatorSelector.vue'
import Services from '@/services'

export default defineComponent({
  components: {
    IndicatorSelector
  },

  setup() {
    const stockData = ref([]);
    const drawer = ref(false);
    const direction = ref('rtl');

    async function loadData() {
      const { data } = await Services.getStockData();
      stockData.value = data;
    }
    loadData();

    return {
      drawer,
      direction,
      stockData
    };
  },
});
</script>