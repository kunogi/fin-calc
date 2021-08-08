<template>
  <el-select v-model="chartInfo.indicatorType" placeholder="Select Indicator">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
  <el-button type="primary" @click="generateChart">+</el-button>
</template>
  
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import store from '../store'
import options from '@/lib/util/indicators'

export default defineComponent({
  props: ['stockData'],

  setup(props) {
    const chartInfo = reactive({
      indicatorType: '',
      stockData: props.stockData
    });

    function generateChart() {
      store.dispatch('newChart', chartInfo);
    }

    return {
      options,
      chartInfo,
      generateChart,
    }
  }
})
</script>