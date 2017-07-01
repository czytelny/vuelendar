<template>
  <div id="app">
    <calendar></calendar>
    <sidebar></sidebar>
  </div>
</template>

<script>
  import Calendar from './components/Calendar'
  import Sidebar from './components/Sidebar'

  export default {
    name: 'app',
    components: {
      Calendar,
      Sidebar
    }
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

  #app {
    display: flex;
  }
</style>
