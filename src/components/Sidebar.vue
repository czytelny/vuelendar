<template>
  <div class="sidebar">
    <header>
      <span>vuelendar</span>
    </header>
        <el-input placeholder="Event title" v-model="input">
          <el-button slot="append" @click="onSubmit">+</el-button>
        </el-input>
    <h3>Stats</h3>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          Training <i class="header-icon el-icon-information"></i>
        </template>
        <div>In this month:</div>
        <div>Days since last:</div>
        <div>Longest strike:</div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        activeName: null,
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
    }
  }
</script>

<style>
  .sidebar {
    width: 20%;
    padding: 0 10px;
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
