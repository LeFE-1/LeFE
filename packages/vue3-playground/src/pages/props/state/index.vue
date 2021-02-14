<template>
  <el-card header="state">
    <div class="lefe-intro__code">
      <p>
        在
        <code>SP Page</code>顶级组件中
        <code>state</code>表示
        <code>SP</code>
        的一个状态栈，其中存储了各种字段(状态)；而在各个我们使用的组件中，
        <code>state</code>
        表示我们绑定的顶级组件中
        <code>state</code>的哪个字段。在该组件某个内部与
        <code>state</code>
        绑定的属性变更时，会同步更新顶级组件中
        <code>state</code>的该字段的值。
      </p>
      <p>
        大多数
        <code>SP</code>组件
        <code>state</code>的使用是一样的
        ，基本上表示与
        <code>SP</code>所代表的原生组件的
        <code>v-model</code>
        的绑定值一样。
      </p>
    </div>
  </el-card>
</template>
<script>

export default {

}
</script>
