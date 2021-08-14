<template>
  <el-button @click="drawer = true" type="danger" icon="el-icon-plus">Add Indicator</el-button>

  <el-drawer v-model="drawer" title="New Chart" :direction="direction" destroy-on-close>
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