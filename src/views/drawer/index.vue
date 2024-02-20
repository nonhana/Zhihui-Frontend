<template>
  <div class="index">
    <el-row type="flex">
      <DrawerHeader @undo="undo" @redo="redo" />
    </el-row>
    <el-row style="margin: 30px auto" type="flex" justify="center">
      <div>
        <DrawerSideBar @redraw="redraw" @get-strokes="getStrokes" />
      </div>
      <div style="margin-left: 40px">
        <DrawerDrawingBoard
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
import DrawerHeader from '@/components/ModelDrawer/DrawerHeader.vue'
import DrawerSideBar from '@/components/ModelDrawer/DrawerSideBar.vue'
import DrawerDrawingBoard from '@/components/ModelDrawer/DrawerDrawingBoard.vue'

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
