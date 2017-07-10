<template>
  <div class="sidebar hidden-sm-down">
    <header>
      <span>vuelendar</span>
    </header>
    <add-new-event @eventSubmit="saveEvent"></add-new-event>
    <h3><span v-if="eventsHasItems">Events</span></h3>
    <div
      v-loading="loadingInProgress"
      element-loading-text="Loading..."
    >
      <events-list :events="events"
                   v-if="eventsHasItems"
                   @changeColor="changeColor"
                   @removeEvent="removeEvent">
      </events-list>
    </div>
  </div>

</template>

<script>
  import firebase from './../firebaseInit'
  import { Message } from 'element-ui'
  import AddNewEvent from './AddNewEvent'
  import EventsList from './EventsList'
  import randomColor from 'random-material-color'

  export default {
    name: 'sidebar',
    props: ['loadingInProgress', 'events'],
    computed: {
      eventsHasItems () {
        return this.events.length !== 0
      }
    },
    methods: {
      saveEvent (eventName) {
        if (eventName.length !== 0) {
          if (this.events.length > 10) {
            Message.error({
              message: 'Sorry, too much events on the list :(',
              type: 'error'
            })
            return
          }
          firebase.database().ref('events/').push({
            name: eventName,
            color: randomColor.getColor()
          })
          Message.success({
            message: 'Event added',
            type: 'success'
          })
        }
      },
      removeEvent (eventId) {
        firebase.database().ref(`events/${eventId}`).remove()
      },
      changeColor ({eventId, color}) {
        firebase.database().ref(`events/${eventId}`).update({color})
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
    min-width: 250px;
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

  @media (max-width: 767px) {
    .hidden-sm-down {
      display: none !important
    }
  }
</style>
