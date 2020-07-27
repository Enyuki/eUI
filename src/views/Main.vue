<template>
  <div class="demo-image__lazy">
    <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          ]
      }
    }
  }
</script>

<style scoped>

</style>
