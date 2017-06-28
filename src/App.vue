<template>
  <div id="app">
    <calendar></calendar>
    <div class="sidebar">
      <header>
        <span>vuelendar</span>
      </header>
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="Event title" v-model="input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Calendar from './components/Calendar'
//  import db from './firebaseInit'

//  let eventsRef = db.ref('events')

  export default {
    name: 'app',
    data () {
      return {
        input: null,
        newEvent: {
          title: '',
          id: '',
          date: new Date()
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submitting')
      }
    },
    firebase: {
//      events: eventsRef
    },
    components: {
      Calendar
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

  .sidebar {
    width: 20%;
  }

  header {
    padding: 16px;
    background-color: #4fc08d;
    color: #ffffff;
    font-size: 20px;
    line-height: 1;
    text-align: center;
    margin: 0 0 10px;

  }
</style>
