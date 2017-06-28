<template>
  <div id="app">
    <calendar></calendar>
    <sidebar></sidebar>
  </div>
</template>

<script>
  import Calendar from './components/Calendar'
  import Sidebar from './components/Sidebar'
//  import db from './firebaseInit'

//  let eventsRef = db.ref('events')

  export default {
    name: 'app',
    data () {
      return {
        newEvent: {
          title: '',
          id: '',
          date: new Date()
        }
      }
    },
    firebase: {
//      events: eventsRef
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
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
  }
</style>
