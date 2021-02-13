<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="this.$route.path" router>
        <el-menu-item :index="Index.path">{{ Index.name }}</el-menu-item>
        <el-submenu index="1">
          <template v-slot:title>
            <span>通用参数</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item in Props"
              :index="item.path"
              :key="item.path"
            >{{ item.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template v-slot:title>
            <span>组件</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item in Components"
              :index="item.path"
              :key="item.path"
            >{{ item.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { Index, Components, Props } from './pages/routes'
  export default {
    data() {
      return {
        Index: Index[0],
        Components,
        Props
      }
    }
  }
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #app {
    display: flex;
    height: 100%;
  }
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .lefe-intro__code {
    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      line-height: 18px;
    }

    p {
      padding: 8px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
</style>
