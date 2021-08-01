
<template>
  <template>
    <el-input placeholder="请输入内容" v-model="chartInfo.title" clearable></el-input>
  </template>

  <el-select v-model="chartInfo.dataSource" placeholder="选择数据源">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>

  <el-radio-group v-model="chartInfo.chartType">
    <el-radio-button label="line">折线图</el-radio-button>
    <el-radio-button label="bar">柱状图</el-radio-button>
  </el-radio-group>
  <hr />
  <el-button type="primary" @click="addChart">+</el-button>
</template>
  
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import store from '../store'

export default defineComponent({
  setup() {
    const chartInfo = reactive({
      title: '',
      dataSource: '',
      chartType: ''
    });

    const options = reactive([{
      value: '/_SINAPROXY_/cn/api/json.php/CN_MarketDataService.getKLineData?symbol=sh000001&scale=240&ma5=no&datalen=123',
      label: 'aa-aa'
    }, {
      value: '/_MEITUANPROXY_/ptapi/suggest?keyword=a',
      label: 'bb-b'
    }, {
      value: 'ccc-ccc',
      label: 'cc'
    }]);

    function addChart() {
      store.dispatch('newChart', chartInfo);
    }

    return {
      options,
      chartInfo,
      addChart,
    }
  }
})
</script>