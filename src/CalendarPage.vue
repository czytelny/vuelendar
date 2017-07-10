<template>
<div class="calendarContainer">
    <calendar :events="events"></calendar>
    <sidebar :events="events"
             :loadingInProgress="loadingInProgress">
    </sidebar>
    <mobile-sidebar></mobile-sidebar>
</div>
</template>

<script>
  import Calendar from './components/calendar/Calendar'
  import Sidebar from './components/Sidebar'
  import MobileSidebar from './components/MobileSidebar'
  import firebase from './firebaseInit'

  export default {
    name: 'CalendarPage',
    data () {
      return {
        loadingInProgress: true
      }
    },
    firebase: {
      events: {
        source: firebase.database().ref('events'),
        readyCallback: function () {
          this.loadingInProgress = false
        }
      }
    },
    components: {
      Calendar,
      Sidebar,
      MobileSidebar
    }
  }
</script>

<style>
  .calendarContainer {
    display: flex;
  }

</style>
