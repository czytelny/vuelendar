<template>
  <div id="app">
    <calendar :events="events"></calendar>
    <sidebar :events="events"
             :loadingInProgress="loadingInProgress">
    </sidebar>
    <mobile-sidebar></mobile-sidebar>
  </div>
</template>

<script>
  import Calendar from './components/calendar/Calendar'
  import Sidebar from './components/Sidebar'
  import MobileSidebar from './components/MobileSidebar'
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
      Sidebar,
      MobileSidebar
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

  .float-right {
    float: right;
  }

  #app {
    display: flex;
  }

  .pointer {
    cursor: pointer;
  }
</style>
