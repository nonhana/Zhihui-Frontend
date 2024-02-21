// src/utils/types.ts
// 定义类型的文件

// 素材筛选条件
export interface MaterialFilter {
  /**
   * 素材类型
   */
  type: string
  /**
   * 子类型
   */
  childType: string
  /**
   * 风格
   */
  style: string
  /**
   * 颜色
   */
  color: string
  /**
   * 关键字
   */
  keyword: string
}

// 单个素材item信息
export interface MaterialItem {
  /**
   * 素材id
   */
  material_id: number
  /**
   * 素材名称
   */
  name: string
  /**
   * 素材类型
   */
  type: string
  /**
   * 子类型
   */
  childType: string
  /**
   * 风格
   */
  style: string
  /**
   * 颜色
   */
  color: string
  /**
   * 素材描述
   */
  desc: string
  /**
   * 素材成果图
   */
  resultImg: string
  /**
   * 素材原图
   */
  originImg: string
  /**
   * 素材prompt
   */
  prompt: string
  /**
   * 素材点赞量
   */
  like: number
  /**
   * 素材收藏量
   */
  collect: number
}
