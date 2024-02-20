<template>
  <div class="materialitem-wrapper">
    <div class="mask">
      <div class="buttons">
        <el-button type="info">立即下载</el-button>
        <el-button type="primary">收藏</el-button>
      </div>
      <div class="name">
        <span>{{ materialItem.name }}</span>
      </div>
    </div>
    <div class="cover">
      <img :src="materialItem.resultImg" :alt="materialItem.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MaterialItem } from '@/utils/types'

defineProps<{
  materialItem: MaterialItem
}>()
</script>

<style scoped lang="scss">
.materialitem-wrapper {
  position: relative;
  width: 250px;
  height: 250px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s;
    .buttons {
      display: flex;
      justify-content: space-between;
    }
    .name {
      span {
        color: #fff;
        font-size: 20px;
      }
    }
  }
  .cover {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &:hover {
    .mask {
      opacity: 1;
    }
  }
}
</style>
