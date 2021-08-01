<template>
  <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">+</el-button>

  <el-drawer title="新建图表" v-model="drawer" :direction="direction" destroy-on-close>
    
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
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