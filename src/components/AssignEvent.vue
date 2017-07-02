<template>
  <el-dialog
    title="Assign event"
    :visible.sync="dialogVisible"
    size="tiny"
    :before-close="handleClose">

    <div v-for="event in events" :key="event['.key']" class="pointer clickable">
         <span class="color-icon"
               :style="{'background-color': event.color}"
         ></span>
      {{event.name}}
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">Close</el-button>
      </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'assignEvent',
    props: ['events', 'dialogVisible'],
    methods: {
      closeDialog () {
        this.$emit('closeAssignEventDialog')
      },
      handleClose () {
        console.log('hadnling close')
      }
    }
  }
</script>

<style>
  .clickable {
    transition: all .3s;
  }
  .clickable:hover {
    color: #20A0FF;
  }

</style>
