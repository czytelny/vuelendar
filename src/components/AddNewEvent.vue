<template>
  <form v-on:submit.prevent="eventSubmit">
    <el-input placeholder="Event title" v-model="input">
      <el-button type="submit" slot="append" @click="eventSubmit">+</el-button>
    </el-input>
  </form>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        input: null
      }
    },
    methods: {
      eventSubmit () {
        this.$emit('eventSubmit', this.input)
      }
    }
  }
</script>

<style>

</style>
