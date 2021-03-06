<template>
  <div class="calendar">
    <h1>
      {{selectedMonthText}} {{selectedYearText}}
      <div class="monthSwitcher">
        <i class="el-icon el-icon-arrow-left pointer" @click="previousMonth()"></i>
        <i class="el-icon el-icon-arrow-right pointer" @click="nextMonth()"></i>
      </div>
    </h1>

    <assign-event @closeAssignEventDialog="dialogVisible = false"
                  :date="selectedDay"
                  :events="events"
                  :dialogVisible="dialogVisible"></assign-event>
    <div class="workspace">
      <tile v-for="item in daysInMonth"
            :key="item.format()"
            @click.native="selectDay(item)"
            @removeAssignment="removeAssignment"
            :selectedMonth="selectedMonth"
            :events="events"
            :day="item">
      </tile>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import firebase from './../../firebaseInit'
  import { MessageBox } from 'element-ui'
  import Tile from './Tile'
  import AssignEvent from './AssignEvent'

  export default {
    name: 'calendar',
    props: ['events'],
    data () {
      return {
        dialogVisible: false,
        selectedDay: moment(),
        selectedMonth: moment()
      }
    },
    computed: {
      daysInMonth () {
        const previousMonthLength = moment(this.selectedMonth).subtract(1, 'month').daysInMonth()
        const weekDay = moment(this.selectedMonth).date(1).isoWeekday()
        const daysArray = []
        for (let i = previousMonthLength; i > previousMonthLength - (weekDay - 1); i--) {
          daysArray.push(moment(this.selectedMonth).subtract(1, 'month').date(i))
        }
        daysArray.reverse()
        for (let i = 1; i <= this.selectedMonth.daysInMonth(); i++) {
          daysArray.push(moment(this.selectedMonth).date(i))
        }
        return daysArray
      },
      selectedMonthText () {
        return this.selectedMonth.format('MMMM')
      },
      selectedYearText () {
        return this.selectedMonth.format('YYYY')
      },
      eventsPerDay (dayNumber) {
        return this.events
      }
    },
    methods: {
      removeAssignment ({event, assignment}) {
        const assignmentKey = Object.keys(event.assignments).find((key) => event.assignments[key] === assignment)
        firebase.database().ref(`events/${event['.key']}/assignments/${assignmentKey}`).remove()
      },
      selectDay (day) {
        if (day.isBefore(this.selectedMonth, 'month')) {
          this.previousMonth()
          return
        }
        if (day.isAfter(moment(), 'day')) {
          MessageBox.alert('Whoops, can\'t assign event to a future date! By assigning event you mark what have ' +
            'happened, not what will happen', 'Future day', {confirmButtonText: 'OK', closeOnPressEscape: true})
          return
        }
        if (this.events.length === 0) {
          MessageBox.alert('First, you need to add an event. Then you can assign it to a day', 'No events',
            {confirmButtonText: 'OK', closeOnPressEscape: true})
          return
        }
        this.dialogVisible = true
        this.selectedDay = day
      },
      previousMonth () {
        this.selectedMonth = moment(this.selectedMonth.subtract(1, 'month'))
      },
      nextMonth () {
        this.selectedMonth = moment(this.selectedMonth.add(1, 'month'))
      }
    },
    components: {
      MessageBox,
      AssignEvent,
      Tile
    }

  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  h1 {
    text-align: center;
  }

  .calendar {
    width: 100%;
  }

  .monthSwitcher {
    text-align: center;
  }

  .monthSwitcher i {
    border: 1px solid #cece;
    font-size: .5em;
  }

  @media (max-width: 767px) {
    h1 {
      text-align: center;
      font-size: 1.5em;
    }
  }

  .workspace {
    display: flex;
    flex-wrap: wrap;
    margin: 2px;
    width: 100%;
    height: 100%;
  }
</style>
