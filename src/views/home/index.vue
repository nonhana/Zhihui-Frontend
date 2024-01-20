<template>
  <div class="index">
    <el-row type="flex">
      <HomeHeader @undo="undo" @redo="redo" />
    </el-row>
    <el-row
      style="width: calc(100% - 60px); margin: 30px auto"
      type="flex"
      justify="space-between"
    >
      <div>
        <HomeSideBar @redraw="redraw" @get-strokes="getStrokes" />
      </div>
      <div>
        <HomeDrawingBoard
          :undo-status="undoStatus"
          :redo-status="redoStatus"
          :redraw-status="redrawStatus"
          :get-strokes-status="getStrokesStatus"
        />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeHeader from '@/components/ModelHome/HomeHeader.vue'
import HomeSideBar from '@/components/ModelHome/HomeSideBar.vue'
import HomeDrawingBoard from '@/components/ModelHome/HomeDrawingBoard.vue'

const undoStatus = ref<number>(0)
const undo = () => {
  undoStatus.value++
}

const redoStatus = ref<number>(0)
const redo = () => {
  redoStatus.value++
}

const redrawStatus = ref<number>(0)
const redraw = () => {
  redrawStatus.value++
}

const getStrokesStatus = ref<number>(0)
const getStrokes = () => {
  getStrokesStatus.value++
}
</script>

<style scoped lang="scss">
.index {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
