<template>
  <div class="materialheader-wrapper">
    <div class="user">
      <div class="avatar">
        <img :src="userInfo.avatar" alt="avatar" />
      </div>
      <div class="divider" />
      <el-dropdown>
        <div class="name">
          <span>{{ userInfo.name }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="input">
      <el-button v-if="keyword !== ''" type="danger" @click="clear"
        >重置</el-button
      >
      <el-input
        v-model="keyword"
        placeholder="请输入你想找的素材关键词"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const { materialFilter } = useStore()

const userInfo = ref({
  name: '用户名',
  avatar: 'https://dummyimage.com/400X400'
})
const keyword = ref<string>(materialFilter.filter.keyword)

const clear = () => {
  keyword.value = ''
  materialFilter.setFilter({ ...materialFilter.filter, keyword: '' })
}

const search = () => {
  if (keyword.value === '')
    ElNotification({
      title: '提示',
      message: '请输入搜索关键词',
      type: 'warning'
    })
  console.log('search', keyword.value)
  materialFilter.reset()
  materialFilter.setFilter({ ...materialFilter.filter, keyword: keyword.value })
}
</script>

<style scoped lang="scss">
.materialheader-wrapper {
  position: relative;
  width: calc(100% - 100px);
  padding: 0 50px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  .divider {
    width: 1px;
    height: 32px;
    background-color: #c9cdd4;
    margin: 0 20px;
  }
  .user {
    display: flex;
    align-items: center;
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      font-size: 14px;
      font-family: HarmonyOS_Sans_SC_Regular;
      color: #303133;
      cursor: pointer;
    }
  }
  .input {
    display: flex;
    align-items: center;
    .el-input {
      width: 300px;
      margin: 0 20px;
    }
    .el-button {
      width: 80px;
    }
  }
}
</style>
