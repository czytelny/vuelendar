<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    margin: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .float-right {
    float: right;
  }

  .pointer {
    cursor: pointer;
  }

  @media (max-width: 767px) {
    .el-dialog {
      width: 100%;
    }
  }
</style>
