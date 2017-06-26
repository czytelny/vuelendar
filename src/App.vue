<template>
  <div id="app">
    <h1>
      hello world!
    </h1>
    <el-form label-width="120px" :inline="true">
      <el-form-item label="Activity name">
        <el-input placeholder="Event title" v-model="input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Hello from './components/Hello'
  import db from './firebaseInit'

  let eventsRef = db.ref('events')

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
      events: eventsRef
    },
    components: {
      Hello
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
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #4fc08d;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }
</style>
