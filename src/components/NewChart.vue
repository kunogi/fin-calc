<template>
  <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">+</el-button>

  <el-drawer title="新建图表" v-model="drawer" :direction="direction" destroy-on-close>
    <data-source />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DataSource from './DataSource.vue'

export default defineComponent({
  components: {
    DataSource
  },
  setup() {
    const drawer = ref(false);
    const direction = ref('rtl');

    return {
      drawer,
      direction,
    };
  },
});
</script>