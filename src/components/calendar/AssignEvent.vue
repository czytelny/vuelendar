<template>
  <el-dialog
    :title="`Assign event to ${this.formattedDate}`"
    :visible="dialogVisible"
    size="tiny"
    :before-close="closeDialog"
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
  import firebase from '../../firebaseInit'

  export default {
    name: 'assignEvent',
    props: ['date', 'events', 'dialogVisible'],
    computed: {
      formattedDate () {
        return this.date.format('Do MMMM YYYY')
      }
    },
    methods: {
      closeDialog () {
        this.$emit('closeAssignEventDialog')
      },
      assignEvent (event) {
        firebase.database().ref('events/' + event['.key']).child('assignments').push().set(this.date.startOf('day').valueOf())
        this.closeDialog()
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
