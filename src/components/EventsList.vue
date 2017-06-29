<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item :name="event['.key']" v-for="event in events" :key="event['.key']">
      <template slot="title">
        {{event.name}}
      </template>
      <div>In this month:</div>
      <div>Days since last:</div>
      <div>Longest strike:</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  export default {
    name: 'EventsList',
    props: ['events'],
    data () {
      return {
        activeName: null
      }
    }
  }
</script>

<style>

</style>
