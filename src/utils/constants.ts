// src/utils/constants.ts
// 存放常量的文件
import Pen from '@/assets/svgs/Pen.svg'
import Brush from '@/assets/svgs/Brush.svg'
import WritingBrush from '@/assets/svgs/WritingBrush.svg'
import HighlighterPen from '@/assets/svgs/HighlighterPen.svg'
import Palette from '@/assets/svgs/Palette.svg'
import Eraser from '@/assets/svgs/Eraser.svg'

export const HEADER_TABS = ['首页', '画板页面', '生成页面', '帮助中心']

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
    logo: Brush
  },
  {
    name: '荧光笔',
    logo: HighlighterPen
  },
  {
    name: '调色盘',
    logo: Palette
  },
  {
    name: '橡皮擦',
    logo: Eraser
  }
]
