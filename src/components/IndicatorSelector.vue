<template>
  <el-row>
    <el-select v-model="chartInfo.indicatorType" placeholder="Select An Indicator" size="small">
      <el-option
        v-for="indicator in indicators"
        :key="indicator.value"
        :label="indicator.label"
        :value="indicator.value"
        :disabled="indicator.disabled"
      ></el-option>
    </el-select>

    <el-button
      type="danger"
      @click="generateChart"
      icon="el-icon-plus"
      :disabled="!chartInfo.indicatorType"
      size="small"
    />
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import store from '@/store'
import indicators from '@/lib/util/indicators'
import { NEW_CHART } from '@/store/mutation-types'

export default defineComponent({
  props: ['stockData'],

  setup(props) {
    const chartInfo = reactive({
      indicatorType: '',
      stockData: props.stockData
    });

    function generateChart() {
      store.dispatch(NEW_CHART, chartInfo)
    }

    return {
      indicators,
      chartInfo,
      generateChart,
    }
  }
})
</script>