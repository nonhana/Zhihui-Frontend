<template>
  <div class="commonheader-wrapper">
    <div class="logo">
      <img :src="logo" alt="logo" />
      <span>绘画生成网站</span>
    </div>

    <div class="tabs">
      <div class="tabs-item" v-for="(tab, index) in HEADER_TABS" :key="index">
        <span>{{ tab }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HEADER_TABS } from '@/utils/constants'
import logo from '@/assets/imgs/logo.png'
</script>

<style scoped lang="scss">
.commonheader-wrapper {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .logo {
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 20px;
    font-family: HarmonyOS_Sans_SC_Bold;
    color: #5b54e4;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
  .tabs {
    display: flex;
    align-items: center;
    margin-left: 28px;
    font-size: 16px;
    font-family: HarmonyOS_Sans_SC_Regular;
    color: #3d3d3d;
    .tabs-item {
      margin-left: 32px;
      height: 60px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      &:hover {
        color: #5b54e4;
      }
    }
  }
}
</style>
