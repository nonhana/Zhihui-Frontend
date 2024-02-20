<template>
  <div class="index">
    <el-row>
      <MaterialHeader />
    </el-row>

    <el-row>
      <MaterialFilter />
    </el-row>

    <el-row>
      <MaterialMain />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import MaterialHeader from '@/components/ModelMaterial/MaterialHeader.vue'
import MaterialFilter from '@/components/ModelMaterial/MaterialFilter.vue'
import MaterialMain from '@/components/ModelMaterial/MaterialMain.vue'
</script>

<style scoped lang="scss">
.index {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
