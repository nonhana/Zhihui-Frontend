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
    </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store'
import { PAINT_TOOLS } from '../../utils/constants'
import HomeSideBarTools from '@/assets/svgs/HomeSideBarTools.svg'

const { paintConfig } = useStore()

const setTool = (tool: string) => {
  if (paintConfig.presentTool === tool) {
    paintConfig.presentTool = ''
  } else {
    paintConfig.presentTool = tool
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
        margin-left: 10px;
      }
      img {
        width: 24px;
        height: 24px;
      }
      span {
        margin-left: 10px;
      }
    }
    .active {
      color: #5b54e4;
      margin-left: 10px;
    }
  }
}
</style>
