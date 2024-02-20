<template>
  <div class="materialmain-wrapper">
    <el-row>
      <el-radio-group v-model="filter.type">
        <el-radio-button label="素材" />
        <el-radio-button label="模板" />
      </el-radio-group>
    </el-row>

    <el-row v-if="materialFilter.filter.keyword !== ''">
      <div class="keyword">
        <span>
          关键字
          <span>“{{ materialFilter.filter.keyword }}”</span>
          共有
          <span>{{ totalCount }}</span>
          个结果
        </span>
      </div>
    </el-row>

    <el-row style="margin-top: 20px" type="flex" align="middle">
      <div class="title">
        <span>类型：</span>
      </div>
      <div class="choices">
        <div
          class="choices-item"
          :class="{ active: filter.childType === item }"
          v-for="item in MATERIAL_FILTER_CHOICES.childType"
          :key="item"
          @click="chooseFilter(1, item)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </el-row>

    <el-row style="margin-top: 20px" type="flex" align="middle">
      <div class="title">
        <span>风格：</span>
      </div>
      <div class="choices">
        <div
          class="choices-item"
          :class="{ active: filter.style === item }"
          v-for="item in MATERIAL_FILTER_CHOICES.style"
          :key="item"
          @click="chooseFilter(2, item)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </el-row>

    <el-row style="margin-top: 20px" type="flex" align="middle">
      <div class="title">
        <span>颜色：</span>
      </div>
      <div class="choices">
        <div
          class="choices-item"
          :class="{ active: filter.color === item }"
          v-for="item in MATERIAL_FILTER_CHOICES.color"
          :key="item"
          @click="chooseFilter(3, item)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </el-row>

    <el-row style="margin-top: 20px" type="flex">
      <el-button type="danger" @click="resetFilter">重置条件</el-button>
      <el-button type="primary" @click="submitFilter">确认条件</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from '@/store'
import { MATERIAL_FILTER_CHOICES } from '@/utils/constants'
import type { MaterialFilter } from '@/utils/types'

const { materialFilter } = useStore()

const filter = ref<MaterialFilter>({
  ...materialFilter.filter
})
watch(
  () => materialFilter.filter,
  () => {
    filter.value = {
      ...materialFilter.filter
    }
  }
)
const totalCount = ref(0)

const chooseFilter = (type: number, value: string) => {
  if (type === 1) {
    filter.value.childType = value
  }
  if (type === 2) {
    filter.value.style = value
  }
  if (type === 3) {
    filter.value.color = value
  }
}

const resetFilter = () => {
  filter.value = {
    keyword: materialFilter.filter.keyword,
    type: '素材',
    childType: '全部',
    style: '全部',
    color: '全部'
  }
  materialFilter.setFilter(filter.value)
}

const submitFilter = () => {
  materialFilter.setFilter(filter.value)
}
</script>

<style scoped lang="scss">
.materialmain-wrapper {
  position: relative;
  width: calc(100% - 100px);
  padding: 20px 50px;
  background: #fff;
  .keyword {
    margin: 20px 0 0 0;
    span {
      color: #9e9e9e;
      font-size: 16px;
      span {
        &:nth-child(1) {
          color: #000;
          font-weight: bold;
        }
        &:nth-child(2) {
          color: blue;
          font-weight: bold;
        }
      }
    }
  }
  .title {
    width: 100px;
    span {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
  }
  .choices {
    display: flex;
    flex-wrap: wrap;
    &-item {
      user-select: none;
      margin-right: 20px;
      padding: 5px 10px;
      border-radius: 5px;
      background: #f5f5f5;
      cursor: pointer;
      transition: all 0.3s;
      span {
        font-size: 14px;
        color: #000;
      }
      &.active {
        background: #409eff;
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>
