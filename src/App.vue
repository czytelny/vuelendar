<template>
  <div id="app">
    <calendar :events="events"></calendar>
    <sidebar :events="events"
             :loadingInProgress="loadingInProgress">
    </sidebar>
  </div>
</template>

<script>
  import Calendar from './components/calendar/Calendar'
  import Sidebar from './components/Sidebar'
  import db from './firebaseInit'

  export default {
    name: 'app',
    data () {
      return {
        loadingInProgress: true
      }
    },
    firebase: {
      events: {
        source: db.ref('events'),
        readyCallback: function () {
          this.loadingInProgress = false
        }
      }
    },
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

  .pointer {
    cursor: pointer;
  }
</style>
