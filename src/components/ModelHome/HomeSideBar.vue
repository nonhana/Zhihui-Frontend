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
        <el-button
          style="margin-left: 20px"
          v-if="paintConfig.presentTool === item.name"
          size="small"
          @click.stop="toolStatus[index] = true"
          >设置</el-button
        >
      </div>
    </div>
    <div class="list">
      <div class="list-header">
        <img :src="HomeSideBarController" alt="HomeSideBarController" />
        <span>绘画设置区</span>
      </div>
      <div
        :class="
          paintConfig.toolSettings.lock ? 'list-item active' : 'list-item'
        "
        @click="controllerTrigger(-1)"
      >
        <component :is="paintConfig.toolSettings.lock ? Unlock : Lock" />
        <span>{{
          paintConfig.toolSettings.lock ? '解锁画布' : '锁定画布'
        }}</span>
      </div>
      <div
        v-for="(item, index) in PAINT_CONTROLLERS"
        :key="index"
        class="list-item"
        @click="controllerTrigger(index)"
      >
        <component :is="PAINT_CONTROLLERS_ICONS[index]" />
        <span>{{ item }}</span>
        <el-button
          style="margin-left: 20px"
          v-if="
            item === '背景图片' &&
            paintConfig.toolSettings.backgroundImage !== ''
          "
          size="small"
          @click.stop="paintConfig.toolSettings.backgroundImage = ''"
          >清除</el-button
        >
      </div>
    </div>
    <!-- 工具区画笔工具设置的dialog -->
    <el-dialog v-model="toolStatus[0]" title="勾线笔设置" width="400">
      <div>
        <el-row
          style="margin-bottom: 10px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <span>画笔粗细：</span>
          <el-select
            v-model="paintConfig.toolSettings.line"
            placeholder="请选择画笔的粗细"
          >
            <el-option
              v-for="item in 20"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-row>
        <el-row
          style="margin-bottom: 10px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <span>画笔形状：</span>
          <el-select
            v-model="paintConfig.toolSettings.lineCap"
            placeholder="请选择画笔的形状"
          >
            <el-option
              v-for="item in lineCapList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
        <el-row
          style="margin-bottom: 10px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <span>画笔连接处形状：</span>
          <el-select
            v-model="paintConfig.toolSettings.lineJoin"
            placeholder="请选择画笔的连接处形状"
          >
            <el-option
              v-for="item in lineJoinList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
      </div>
      <template #footer>
        <el-button @click="toolStatus[0] = false">取消</el-button>
        <el-button type="primary" @click="toolStatus[0] = false">
          确认
        </el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="toolStatus[4]" title="画笔颜色设置" width="400">
      <div>
        <el-row
          style="margin-bottom: 10px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <span>画笔颜色：</span>
          <div>
            <span style="margin-right: 20px">{{
              paintConfig.toolSettings.color
            }}</span>
            <el-color-picker
              v-model="paintConfig.toolSettings.color"
              size="large"
              popper-class="hex"
            />
          </div>
        </el-row>
      </div>
      <template #footer>
        <el-button @click="toolStatus[4] = false">取消</el-button>
        <el-button type="primary" @click="toolStatus[4] = false">
          确认
        </el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="toolStatus[5]" title="形状设置" width="400">
      <div>
        <el-row
          style="margin-bottom: 10px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <span>形状：</span>
          <el-select
            v-model="paintConfig.toolSettings.strokeType"
            placeholder="请选择想要绘制的形状"
          >
            <el-option
              v-for="item in shapeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
        <el-row
          style="margin-bottom: 10px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <span>勾线/填充：</span>
          <el-select
            v-model="paintConfig.toolSettings.fillShape"
            placeholder="请选择勾线还是填充"
          >
            <el-option
              v-for="item in fillShapeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
      </div>
      <template #footer>
        <el-button @click="toolStatus[5] = false">取消</el-button>
        <el-button type="primary" @click="toolStatus[5] = false">
          确认
        </el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="toolStatus[6]" title="橡皮设置" width="400">
      <div>
        <el-row
          style="margin-bottom: 10px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <span>橡皮擦粗细：</span>
          <el-select
            v-model="paintConfig.toolSettings.line"
            placeholder="请选择橡皮擦的粗细"
          >
            <el-option
              v-for="item in 20"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-row>
      </div>
      <template #footer>
        <el-button @click="toolStatus[6] = false">取消</el-button>
        <el-button type="primary" @click="toolStatus[6] = false">
          确认
        </el-button>
      </template>
    </el-dialog>
    <!-- 隐藏上传图片的input -->
    <input type="file" ref="bgInput" style="display: none" @change="handleBg" />
    <!-- 设置区画布整体设置的dialog -->
    <el-dialog v-model="settingStatus[0]" title="背景色设置" width="400">
      <div>
        <el-row
          style="margin-bottom: 10px"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <span>背景色：</span>
          <div>
            <span style="margin-right: 20px">{{
              paintConfig.toolSettings.backgroundColor
            }}</span>
            <el-color-picker
              v-model="paintConfig.toolSettings.backgroundColor"
              size="large"
              popper-class="hex"
            />
          </div>
        </el-row>
      </div>
      <template #footer>
        <el-button @click="settingStatus[0] = false">取消</el-button>
        <el-button type="primary" @click="settingStatus[0] = false">
          确认
        </el-button>
      </template>
    </el-dialog>
    <ImgCropper
      :sourceFile="bgSourceFile"
      :croppedFileType="bgCroppedFileType"
      :dialogVisible="settingStatus[1]"
      @upload-image="uploadImage"
      @close-dialog="closeDialog"
    />
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
import ImgCropper from '../../components/Little/Util/ImgCropper.vue'
import HomeSideBarTools from '@/assets/svgs/HomeSideBarTools.svg'
import HomeSideBarController from '@/assets/svgs/HomeSideBarController.svg'
import { Lock, Unlock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const { paintConfig } = useStore()

const emits = defineEmits<{
  (e: 'redraw'): void
  (e: 'get-strokes'): void
}>()

/* ----------绘画工具相关配置---------- */
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
const lineCapList: {
  label: string
  value: string
}[] = [
  {
    label: '平头',
    value: 'butt'
  },
  {
    label: '圆形',
    value: 'round'
  },
  {
    label: '方形',
    value: 'square'
  }
] // 画笔形状列表
const lineJoinList: {
  label: string
  value: string
}[] = [
  {
    label: '斜角',
    value: 'bevel'
  },
  {
    label: '圆角',
    value: 'round'
  },
  {
    label: '尖角',
    value: 'miter'
  }
] // 画笔连接处形状列表
const shapeList: {
  label: string
  value: string
}[] = [
  {
    label: '实线',
    value: 'dash'
  },
  {
    label: '直线',
    value: 'line'
  },
  {
    label: '圆形',
    value: 'circle'
  },
  {
    label: '正方形',
    value: 'square'
  },
  {
    label: '普通三角形',
    value: 'triangle'
  },
  {
    label: '直角三角形',
    value: 'half_triangle'
  }
] // 形状列表
const fillShapeList: {
  label: string
  value: boolean
}[] = [
  {
    label: '勾线',
    value: false
  },
  {
    label: '填充',
    value: true
  }
] // 填充形状列表

const setTool = (tool: string) => {
  if (paintConfig.presentTool === tool) {
    paintConfig.presentTool = ''
  } else {
    paintConfig.presentTool = tool
    if (tool === '橡皮擦') {
      paintConfig.toolSettings.eraser = true
    } else {
      paintConfig.toolSettings.eraser = false
    }
  }
}

/* ----------画布设置相关配置----------- */
const settingStatus = ref<boolean[]>([false, false, false])

const bgInput = ref<HTMLInputElement>()

let bgSourceFile: File | null | undefined = null
let bgCroppedFileType: string = '' // 裁剪后的文件类型
const handleBg = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    bgSourceFile = target.files[0]
    bgCroppedFileType = bgSourceFile?.type ?? ''
    settingStatus.value[1] = true
  }
}
const uploadImage = (imgURL: string) => {
  paintConfig.toolSettings.backgroundImage = imgURL
  settingStatus.value[1] = false
}
const closeDialog = () => {
  settingStatus.value[1] = false
}

const controllerTrigger = (type: number) => {
  switch (type) {
    case -1: // 设置锁
      paintConfig.toolSettings.lock = !paintConfig.toolSettings.lock
      break
    case 0: // 传递事件，重绘画布
      emits('redraw')
      break
    case 1: // 传递事件，保存轨迹
      emits('get-strokes')
      break
    case 2: // 清除本地保存的轨迹
      window.localStorage.removeItem('vue-drawing-canvas')
      ElNotification({
        title: '移除轨迹成功',
        type: 'success'
      })
      break
    case 3: // 设置背景色
      settingStatus.value[0] = true
      break
    case 4: // 设置背景图
      bgInput.value?.click()
      break
  }
}
</script>

<style scoped lang="scss">
.homesidebar-wrapper {
  position: relative;
  background-color: #fff;
  .list {
    user-select: none;
    border: 1px solid #9e9e9e;
    border-radius: 10px;
    width: 200px;
    padding: 10px 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    font-family: ZhanKuKuaiLeTi;
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
