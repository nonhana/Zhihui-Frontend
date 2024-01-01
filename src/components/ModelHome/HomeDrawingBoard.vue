<template>
  <div class="homedrawingboard-wrapper">
    <div class="flex-row">
      <div class="source">
        <vue-drawing-canvas
          ref="VueCanvasDrawing"
          v-model:image="image"
          :width="990"
          :height="660"
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
            border: 'solid 1px #000'
          }"
          :lock="paintConfig.toolSettings.lock"
          @mousemove="getCoordinate($event)"
        />
        <p>
          x轴坐标：<strong>{{ x }}</strong
          >，y轴坐标：<strong>{{ y }}</strong>
        </p>
        <el-button @click="savePicture">保存</el-button>
      </div>

      <!-- <div class="output">
        <p>Output:</p>
        <img :src="image" style="border: solid 1px #000000" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useStore } from '../../store'
import VueDrawingCanvas from 'vue-drawing-canvas'
import { ElNotification } from 'element-plus'

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
const image = ref('')

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

const savePicture = () => {
  const res = VueCanvasDrawing.value.save()
  console.log(res)
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
  width: calc(100vw - 332px);
  .flex-row {
    display: flex;
    flex-direction: row;
    .source {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
