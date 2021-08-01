<template id='app'>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>