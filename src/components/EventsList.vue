<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item :name="event['.key']" v-for="event in events" :key="event['.key']">
      <template slot="title" class="title">
        {{event.name}} <i class="el-icon el-icon-delete" @click.stop="removeEvent(event['.key'])"></i>
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
    },
    methods: {
      removeEvent (eventId) {
        this.$emit('removeEvent', eventId)
      }
    }
  }
</script>

<style>

  .el-icon {
    border: 1px solid #fff;
    border-radius: 2px;
    padding: 3px;
    transition: all .3s;
    float: right;
    margin: 10px;
  }

  .el-icon:hover {
    border: 1px solid #cecece;
    border-radius: 50%;
  }
</style>
