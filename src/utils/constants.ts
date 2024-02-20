// src/utils/constants.ts
// 存放常量的文件
import Pen from '@/assets/svgs/Pen.svg'
import BrushSVG from '@/assets/svgs/Brush.svg'
import WritingBrush from '@/assets/svgs/WritingBrush.svg'
import HighlighterPen from '@/assets/svgs/HighlighterPen.svg'
import Eraser from '@/assets/svgs/Eraser.svg'
import {
  Refresh,
  PictureFilled,
  Remove,
  Brush,
  Picture
} from '@element-plus/icons-vue'

// '首页', '画板页面', '素材库', '社区', '商城'
export const HEADER_TABS = [
  {
    label: '首页',
    value: 'home'
  },
  {
    label: '画板页面',
    value: 'drawer'
  },
  {
    label: '素材库',
    value: 'material'
  },
  {
    label: '社区',
    value: 'community'
  },
  {
    label: '商城',
    value: 'shop'
  }
]

export const PAINT_TOOLS: {
  name: string
  logo: string
}[] = [
  {
    name: '勾线笔',
    logo: Pen
  },
  {
    name: '毛笔',
    logo: WritingBrush
  },
  {
    name: '刷子',
    logo: BrushSVG
  },
  {
    name: '荧光笔',
    logo: HighlighterPen
  },
  {
    name: '橡皮擦',
    logo: Eraser
  }
]

export const PAINT_CONTROLLERS: string[] = [
  '刷新',
  '保存轨迹',
  '移除保存的轨迹',
  '背景色',
  '背景图片'
]

export const PAINT_CONTROLLERS_ICONS = [
  Refresh,
  PictureFilled,
  Remove,
  Brush,
  Picture
]

export const MATERIAL_FILTER_CHOICES = {
  childType: ['全部', '简笔画', '剪贴画', '填色画'],
  style: ['全部', '写实', '童趣', '简约', '扁平', '复古', '图文'],
  color: ['全部', '红', '橙', '黄', '绿', '青', '蓝', '紫', '黑', '白', '灰']
}
