<template>
  <el-dialog
    title="Assign event"
    :visible.sync="dialogVisible"
    size="tiny"
  >
    <div v-for="event in events"
         :key="event['.key']"
         class="pointer clickable"
         @click="assignEvent(event)">
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
  import db from './../firebaseInit'

  export default {
    name: 'assignEvent',
    props: ['date', 'events', 'dialogVisible'],
    methods: {
      closeDialog () {
        this.$emit('closeAssignEventDialog')
      },
      assignEvent (event) {
        db.ref('events/' + event['.key']).child('assignments').push().set(this.date.valueOf())
      }
    }
  }
</script>

<style>
  .clickable {
    transition: all .3s;
    margin: 7px 0;
    padding: 1px 0;
    border-bottom: 1px dashed #f0f0f0;
  }

  .clickable:hover {
    color: #20A0FF;
    border-bottom: 1px dashed #20A0FF;

  }

</style>
