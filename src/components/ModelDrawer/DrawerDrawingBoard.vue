<template>
  <div class="homedrawingboard-wrapper">
    <div class="source">
      <vue-drawing-canvas
        ref="VueCanvasDrawing"
        v-model:image="image"
        :width="width"
        :height="height"
        :stroke-type="paintConfig.toolSettings.strokeType"
        :line-cap="paintConfig.toolSettings.lineCap"
        :line-join="paintConfig.toolSettings.lineJoin"
        :fill-shape="paintConfig.toolSettings.fillShape"
        :eraser="paintConfig.toolSettings.eraser"
        :lineWidth="paintConfig.toolSettings.line"
        :color="paintConfig.toolSettings.color"
        :background-color="paintConfig.toolSettings.backgroundColor"
        :background-image="paintConfig.toolSettings.backgroundImage"
        :initial-image="initialImage"
        saveAs="png"
        :styles="{
          border: 'solid 1px #000',
          borderRadius: '10px'
        }"
        :lock="paintConfig.toolSettings.lock || paintConfig.toolSettings.empty"
        @mousemove="getCoordinate($event)"
        @click="checkToolEmpty"
      />
    </div>
    <div class="info">
      <el-row style="margin-top: 10px" type="flex" align="middle">
        <span>
          x轴坐标：<strong>{{ x }}</strong
          >，y轴坐标：<strong>{{ y }}</strong>
        </span>
      </el-row>
      <el-row style="margin-top: 10px" type="flex" align="middle">
        <span>画布大小：</span>
        <div>
          <el-input-number disabled v-model="width" :min="300" :max="1200" />
        </div>
        <span>&emsp;×&emsp;</span>
        <div>
          <el-input-number disabled v-model="height" :min="200" :max="800" />
        </div>
      </el-row>
      <el-row style="margin-top: 10px" type="flex" align="middle">
        <div>
          <el-button type="primary" @click="savePicture">保存图片</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useStore } from '@/store'
import VueDrawingCanvas from 'vue-drawing-canvas'
import { ElMessageBox, ElNotification } from 'element-plus'

const props = defineProps<{
  undoStatus: number
  redoStatus: number
  redrawStatus: number
  getStrokesStatus: number
}>()

const { paintConfig } = useStore()

const VueCanvasDrawing = ref<typeof VueDrawingCanvas>(VueDrawingCanvas)

const initialImage = ref([
  {
    type: 'dash',
    from: {
      x: 262,
      y: 154
    },
    coordinates: [],
    color: '#000000',
    width: 5,
    fill: false
  }
])

const x = ref(0)
const y = ref(0)
const width = ref(900)
const height = ref(600)
const image = ref('')

const checkToolEmpty = () => {
  if (paintConfig.toolSettings.empty) {
    ElNotification({
      title: '提示',
      message: '请先选择画笔工具',
      type: 'warning'
    })
  }
}

const getCoordinate = (event: any) => {
  let coordinates = VueCanvasDrawing.value.getCoordinates(event)
  x.value = coordinates.x
  y.value = coordinates.y
}

const getStrokes = () => {
  window.localStorage.setItem(
    'vue-drawing-canvas',
    JSON.stringify(VueCanvasDrawing.value.getAllStrokes())
  )
  ElNotification({
    title: '保存轨迹成功',
    message: '重新加载页面会看到之前保存的轨迹',
    type: 'success'
  })
}

// 保存图片
const savePicture = () => {
  // 用户确认后方可保存
  ElMessageBox.confirm('是否保存当前画布内容？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      saveImage()
    })
    .catch(() => {
      ElNotification({
        title: '提示',
        message: '已取消保存',
        type: 'info'
      })
    })

  const saveImage = () => {
    // 将Base64字符串转换为Blob对象的函数
    function base64ToBlob(base64: string) {
      const binaryString = window.atob(base64.split(',')[1]) // 移除Base64的前缀并解码
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      return new Blob([bytes.buffer], { type: 'image/png' })
    }

    const base64 = VueCanvasDrawing.value.save()

    // 将Base64的PNG图片转换为Blob对象
    const blob = base64ToBlob(base64)

    // 创建File对象，这里假设你想将文件命名为'canvasImage.png'
    const file = new File([blob], 'canvasImage.png', { type: 'image/png' })

    // 使用URL.createObjectURL创建指向File对象的URL
    const url = URL.createObjectURL(file)

    // 创建一个临时的a标签来触发下载
    const a = document.createElement('a')
    a.href = url
    a.download = 'canvasImage.png' // 设置下载的文件名
    document.body.appendChild(a) // 将a标签添加到页面中
    a.click() // 触发点击事件，开始下载
    document.body.removeChild(a) // 下载后从页面中移除a标签

    // 清理创建的URL对象，以避免内存泄漏
    URL.revokeObjectURL(url)
  }
}

watch(
  () => props.undoStatus,
  (newV, _) => {
    if (newV !== 0) {
      VueCanvasDrawing.value.undo()
    }
  }
)

watch(
  () => props.redoStatus,
  (newV, _) => {
    if (newV !== 0) {
      VueCanvasDrawing.value.redo()
    }
  }
)

watch(
  () => props.redrawStatus,
  (newV, _) => {
    if (newV !== 0) {
      VueCanvasDrawing.value.redraw()
    }
  }
)

watch(
  () => props.getStrokesStatus,
  (newV, _) => {
    if (newV !== 0) {
      getStrokes()
    }
  }
)

onMounted(() => {
  if ('vue-drawing-canvas' in window.localStorage) {
    initialImage.value = JSON.parse(
      window.localStorage.getItem('vue-drawing-canvas') as string
    )
  }
})
</script>

<style scoped lang="scss">
.homedrawingboard-wrapper {
  position: relative;
  .flex-row {
    display: flex;
    .source {
      display: flex;
      width: 100%;
      height: 100%;
      .info {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
