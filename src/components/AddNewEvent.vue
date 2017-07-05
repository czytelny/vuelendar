<template>
  <form v-on:submit.prevent="eventSubmit">
    <el-input placeholder="Event title" v-model="input" :maxlength="26">
      <el-button type="submit" slot="append" @click="eventSubmit">+</el-button>
    </el-input>
  </form>
</template>

<script>
  export default {
    name: 'addNewEvent',
    data () {
      return {
        input: null
      }
    },
    methods: {
      eventSubmit () {
        this.$emit('eventSubmit', this.input)
        this.input = null
      }
    }
  }
</script>

<style>

</style>
