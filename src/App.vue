<template>
  <div id="app">

    <el-button type="success">
      <router-link to="/login">用户登录</router-link>
    </el-button>

    <el-button type="primary">
      <router-link to="/register">注册新用户</router-link>
    </el-button>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 100px;
  text-align: center;

}
a{
  text-decoration: none;
  color: aliceblue;
}
</style>
