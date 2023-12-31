<template>
  <div class="homesidebar-wrapper">
    <div class="list">
      <div class="list-header">
        <img :src="HomeSideBarTools" alt="HomeSideBarTools" />
        <span>绘画工具区</span>
      </div>
      <div
        v-for="(item, index) in PAINT_TOOLS"
        :key="index"
        :class="
          paintConfig.presentTool === item.name
            ? 'list-item active'
            : 'list-item'
        "
        @click="setTool(item.name)"
      >
        <img :src="item.logo" alt="logo" />
        <span>{{ item.name }}</span>
      </div>
      <div></div>
    </div>
    <div class="list">
      <div class="list-header">
        <img :src="HomeSideBarController" alt="HomeSideBarController" />
        <span>绘画设置区</span>
      </div>
      <div class="list-item" @click="controllerTrigger(-1)">
        <component :is="locking ? Unlock : Lock" />
        <span>{{ locking ? '解锁画布' : '锁定画布' }}</span>
      </div>
      <div
        v-for="(item, index) in PAINT_CONTROLLERS"
        :key="index"
        class="list-item"
        @click="controllerTrigger(index)"
      >
        <component :is="PAINT_CONTROLLERS_ICONS[index]" />
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../../store'
import {
  PAINT_TOOLS,
  PAINT_CONTROLLERS,
  PAINT_CONTROLLERS_ICONS
} from '../../utils/constants'
import HomeSideBarTools from '@/assets/svgs/HomeSideBarTools.svg'
import HomeSideBarController from '@/assets/svgs/HomeSideBarController.svg'
import { Lock, Unlock } from '@element-plus/icons-vue'

const { paintConfig } = useStore()

const locking = ref<boolean>(false)
const toolStatus = ref<boolean[]>([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
])

const setTool = (tool: string) => {
  if (paintConfig.presentTool === tool) {
    paintConfig.presentTool = ''
  } else {
    paintConfig.presentTool = tool
  }
}
const controllerTrigger = (type: number) => {
  switch (type) {
    case -1:
      locking.value = !locking.value
      break
  }
}
</script>

<style scoped lang="scss">
.homesidebar-wrapper {
  position: relative;
  background-color: #fff;
  font-family: ZhanKuKuaiLeTi;
  .list {
    user-select: none;
    border: 1px solid #9e9e9e;
    border-radius: 10px;
    width: 200px;
    padding: 10px 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    &-header {
      margin: 10px 0;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #3d3d3d;
      img {
        width: 32px;
        height: 32px;
      }
      span {
        margin-left: 10px;
      }
    }
    &-item {
      padding: 7px 0;
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #3d3d3d;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: #5b54e4;
        margin-left: 20px;
      }
      img {
        width: 24px;
        height: 24px;
      }
      svg {
        width: 24px;
        height: 24px;
      }
      span {
        margin-left: 10px;
      }
    }
    .active {
      color: #5b54e4;
      margin-left: 20px;
    }
  }
}
</style>
