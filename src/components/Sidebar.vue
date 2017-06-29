<template>
  <div class="sidebar">
    <header>
      <span>vuelendar</span>
    </header>
    <form v-on:submit.prevent="saveEvent">
      <el-input placeholder="Event title" v-model="input">
        <el-button type="submit" slot="append" @click="saveEvent">+</el-button>
      </el-input>
    </form>
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
  import db from './../firebaseInit'
  import ElForm from '../../node_modules/element-ui/packages/form/src/form'

  export default {
    components: {ElForm},
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
      writeEventDate (eventId, eventName) {
        db.ref('events/' + eventId).set({
          name: eventName
        })
      },
      saveEvent () {
        this.writeEventDate(1, this.input)
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
