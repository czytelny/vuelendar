<template>
  <div class="sidebar">
    <header>
      <span>vuelendar</span>
    </header>
    <add-new-event @eventSubmit="saveEvent"></add-new-event>
    <h3>Events</h3>
    <div
      v-loading="loadingInProgress"
      element-loading-text="Loading..."
    >
      <events-list :events="events"
                   @removeEvent="removeEvent">
      </events-list>
    </div>
  </div>

</template>

<script>
  import db from './../firebaseInit'
  import { Message } from 'element-ui'
  import AddNewEvent from './AddNewEvent'
  import EventsList from './EventsList'
  import randomColor from 'random-material-color'

  export default {
    name: 'sidebar',
    props: ['loadingInProgress', 'events'],
    methods: {
      saveEvent (eventName) {
        if (eventName.length !== 0) {
          db.ref('events/').push({
            name: eventName,
            color: randomColor.getColor()
          })
          Message.success({
            title: 'Success',
            message: 'Event added',
            type: 'success'
          })
        }
      },
      removeEvent (eventId) {
        db.ref(`events/${eventId}`).remove()
      }
    },
    components: {
      AddNewEvent,
      EventsList
    }
  }
</script>

<style>
  .sidebar {
    width: 20%;
    padding: 0 0 0 10px;
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
