<template>
  <div class="materialdetailmain-wrapper">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item" alt="素材图片" style="width: 100%" />
      </el-carousel-item>
    </el-carousel>

    <el-row type="flex">
      <div class="title">
        <span>{{ materialDetail.name }}</span>
      </div>
    </el-row>

    <el-row type="flex">
      <div class="description">
        <span>{{ materialDetail.desc }}</span>
      </div>
    </el-row>

    <el-row>
      <ul class="info-list">
        <li>
          类型：<span>
            {{ materialDetail.type }}
          </span>
        </li>
        <li>
          子类型：<span>
            {{ materialDetail.childType }}
          </span>
        </li>
        <li>
          风格：<span>
            {{ materialDetail.style }}
          </span>
        </li>
        <li>
          颜色：<span>
            {{ materialDetail.color }}
          </span>
        </li>
        <li>
          提示词：<span>
            {{ materialDetail.prompt }}
          </span>
        </li>
      </ul>
    </el-row>

    <el-row type="flex">
      <div class="buttom-item" @click="addLike">
        <img v-if="!likeStatus" :src="Like" alt="Like" />
        <img v-else :src="LikeFill" alt="Like" />
        <span>{{ materialDetail.like }}</span>
      </div>

      <div class="buttom-item" @click="addCollect">
        <img v-if="!collectStatus" :src="Collect" alt="Collect" />
        <img v-else :src="CollectFill" alt="Collect" />
        <span>{{ materialDetail.collect }}</span>
      </div>

      <a
        :href="`/drawer?template=${materialDetail.material_id}`"
        target="_blank"
      >
        <div class="buttom-item">
          <img :src="Edit" alt="Edit" />
          <span>采用模板编辑</span>
        </div>
      </a>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MaterialItem } from '@/utils/types'
import Like from '@/assets/svgs/Like.svg'
import LikeFill from '@/assets/svgs/LikeFill.svg'
import Collect from '@/assets/svgs/Collect.svg'
import CollectFill from '@/assets/svgs/CollectFill.svg'
import Edit from '@/assets/svgs/Edit.svg'
import { ElNotification } from 'element-plus'

const materialDetail = ref<MaterialItem>({
  material_id: 0,
  name: '素材名称',
  type: '素材',
  childType: '简笔画',
  style: '写实',
  color: '绿',
  desc: '素材简介',
  resultImg: 'https://dummyimage.com/400X400',
  originImg: 'https://dummyimage.com/400X400',
  prompt: 'prompt',
  like: 1,
  collect: 1
})
const imgList = [materialDetail.value.resultImg, materialDetail.value.originImg]
const likeStatus = ref(false)
const collectStatus = ref(false)

const addLike = () => {
  likeStatus.value = !likeStatus.value
  if (likeStatus.value) {
    materialDetail.value.like++
    ElNotification({
      title: '点赞成功',
      type: 'success'
    })
  } else {
    materialDetail.value.like--
  }
}

const addCollect = () => {
  collectStatus.value = !collectStatus.value
  if (collectStatus.value) {
    materialDetail.value.collect++
    ElNotification({
      title: '收藏成功',
      type: 'success'
    })
  } else {
    materialDetail.value.collect--
  }
}
</script>

<style scoped lang="scss">
.materialdetailmain-wrapper {
  position: relative;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .el-carousel {
    width: 100%;
    margin-bottom: 20px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .description {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .info-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
      margin-right: 20px;
      margin-bottom: 10px;
      span {
        padding: 5px 10px;
        background-color: #409eff;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  .buttom-item {
    user-select: none;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 5px;
    color: #3d3d3d;
    &:hover {
      background-color: #f5f5f5;
    }
    img {
      width: 32px;
      height: 32px;
      margin-right: 5px;
    }
  }
}

:deep(.el-carousel__item) {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
