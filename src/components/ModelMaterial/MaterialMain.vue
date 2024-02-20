<template>
  <div class="materialmain-wrapper">
    <el-row style="margin-left: 50px">
      <el-radio-group v-model="orderType">
        <el-radio-button label="热门" />
        <el-radio-button label="最新" />
      </el-radio-group>
    </el-row>

    <div class="list">
      <a
        class="list-item"
        v-for="item in materialList"
        :key="item.material_id"
        :href="`materialDetail/${item.material_id}`"
        target="_blank"
      >
        <MaterialItemVue :materialItem="item" />
      </a>
      <!-- 每行五个，不足的占位处理 -->
      <div
        class="placeholder"
        v-for="index in materialList.length % 5 !== 0
          ? 5 - (materialList.length % 5)
          : 0"
        :key="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MaterialItem } from '@/utils/types'
import MaterialItemVue from '../Little/Item/MaterialItem.vue'

const orderType = ref('热门')
const materialList = ref<MaterialItem[]>([
  {
    material_id: 0,
    name: '素材名称',
    type: '素材',
    childType: '简笔画',
    style: '写实',
    color: '绿',
    desc: '素材简介',
    resultImg: 'https://dummyimage.com/400X400',
    originImg: 'https://dummyimage.com/400X400',
    prompt: 'prompt'
  },
  {
    material_id: 0,
    name: '素材名称',
    type: '素材',
    childType: '简笔画',
    style: '写实',
    color: '绿',
    desc: '素材简介',
    resultImg: 'https://dummyimage.com/400X400',
    originImg: 'https://dummyimage.com/400X400',
    prompt: 'prompt'
  },
  {
    material_id: 0,
    name: '素材名称',
    type: '素材',
    childType: '简笔画',
    style: '写实',
    color: '绿',
    desc: '素材简介',
    resultImg: 'https://dummyimage.com/400X400',
    originImg: 'https://dummyimage.com/400X400',
    prompt: 'prompt'
  },
  {
    material_id: 0,
    name: '素材名称',
    type: '素材',
    childType: '简笔画',
    style: '写实',
    color: '绿',
    desc: '素材简介',
    resultImg: 'https://dummyimage.com/400X400',
    originImg: 'https://dummyimage.com/400X400',
    prompt: 'prompt'
  },
  {
    material_id: 0,
    name: '素材名称',
    type: '素材',
    childType: '简笔画',
    style: '写实',
    color: '绿',
    desc: '素材简介',
    resultImg: 'https://dummyimage.com/400X400',
    originImg: 'https://dummyimage.com/400X400',
    prompt: 'prompt'
  },
  {
    material_id: 0,
    name: '素材名称',
    type: '素材',
    childType: '简笔画',
    style: '写实',
    color: '绿',
    desc: '素材简介',
    resultImg: 'https://dummyimage.com/400X400',
    originImg: 'https://dummyimage.com/400X400',
    prompt: 'prompt'
  },
  {
    material_id: 0,
    name: '素材名称',
    type: '素材',
    childType: '简笔画',
    style: '写实',
    color: '绿',
    desc: '素材简介',
    resultImg: 'https://dummyimage.com/400X400',
    originImg: 'https://dummyimage.com/400X400',
    prompt: 'prompt'
  }
])
</script>

<style scoped lang="scss">
.materialmain-wrapper {
  position: relative;
  width: 100%;
  background-color: #fff;
  cursor: pointer;
  .list {
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 1350px;
    &-item {
      margin: 10px;
    }
    .placeholder {
      width: 250px;
      height: 250px;
      margin: 10px;
    }
  }
}
</style>
