<template>
  <div class="sidebar">
    <header>
      <span>vuelendar</span>
    </header>
    <add-new-event v-on:eventSubmit="saveEvent"></add-new-event>
    <h3>Stats</h3>
    <events-list :events="events"></events-list>
  </div>

</template>

<script>
  import db from './../firebaseInit'
  import AddNewEvent from './AddNewEvent'
  import EventsList from './EventsList'

  let eventsRef = db.ref('events')

  export default {
    name: 'sidebar',
    firebase: {
      events: eventsRef
    },
    methods: {
      saveEvent (eventName) {
        db.ref('events/').push({
          name: eventName
        })
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
