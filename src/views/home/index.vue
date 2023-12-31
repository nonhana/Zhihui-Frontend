<template>
  <div class="index">
    <el-row type="flex">
      <HomeHeader />
    </el-row>
    <el-row type="flex" justify="space-between">
      <div>
        <HomeSideBar />
      </div>
      <div>
        <HomeDrawingBoard />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from '../../components/ModelHome/HomeHeader.vue'
import HomeSideBar from '../../components/ModelHome/HomeSideBar.vue'
import HomeDrawingBoard from '../../components/ModelHome/HomeDrawingBoard.vue'
</script>

<style scoped lang="scss">
.index {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
