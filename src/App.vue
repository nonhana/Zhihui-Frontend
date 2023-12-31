<template>
  <div class="app">
    <el-row>
      <CommonHeader />
    </el-row>

    <el-row>
      <router-view />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CommonHeader from './components/Little/Common/CommonHeader.vue'
</script>

<style scoped lang="scss">
@import url('@/assets/fonts/f.css');
.app {
  position: relative;
  width: 100%;
}
</style>
