<template>
  <div class="homeheader-wrapper">
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
      <el-input
        v-if="showInput"
        v-model="promptText"
        placeholder="请输入你想生成的关键词"
        :prefix-icon="Search"
        @keyup.enter="savePrompt"
      />
      <el-tooltip
        v-else
        effect="dark"
        content="双击可重新打开关键词输入框"
        placement="top"
      >
        <div class="prompt" @dblclick="showInput = true">
          <span>
            {{ promptText }}
          </span>
        </div>
      </el-tooltip>
    </div>
    <div class="controller">
      <div class="edit">
        <el-tooltip effect="dark" content="撤销一步" placement="top">
          <el-icon @click="emits('undo')"><RefreshLeft /></el-icon>
        </el-tooltip>

        <el-tooltip effect="dark" content="重做一步" placement="top">
          <el-icon @click="emits('redo')"><RefreshRight /></el-icon>
        </el-tooltip>
      </div>
      <div class="divider" />
      <div class="buttons">
        <el-button type="primary">清空画布</el-button>
        <el-button type="primary">生成图片</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../../store'
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { RefreshLeft, RefreshRight } from '@element-plus/icons-vue'

const { paintConfig } = useStore()

const emits = defineEmits<{
  (e: 'undo'): void
  (e: 'redo'): void
}>()

const userInfo = ref({
  name: '用户名',
  avatar: 'https://dummyimage.com/400X400'
})
const promptText = ref<string>('')
const showInput = ref<boolean>(true)

// 保存提示词
const savePrompt = () => {
  if (promptText.value === '') {
    ElMessage({
      message: '关键词不能为空',
      type: 'warning'
    })
    return
  }
  paintConfig.setPrompt(promptText.value)
  showInput.value = false
}
</script>

<style scoped lang="scss">
.homeheader-wrapper {
  position: relative;
  width: 100%;
  padding: 0 50px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    .prompt {
      width: 100%;
      border: 1px solid #c9cdd4;
      padding: 5px 10px;
      font-size: 16px;
      font-family: HarmonyOS_Sans_SC_Regular;
      color: #303133;
      cursor: pointer;
    }
  }
  .controller {
    display: flex;
    align-items: center;
    .edit {
      display: flex;
      align-items: center;
      :deep(.el-icon) {
        margin-left: 16px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    .buttons {
      display: flex;
      align-items: center;
    }
  }
}
</style>
