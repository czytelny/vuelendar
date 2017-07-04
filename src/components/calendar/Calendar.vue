<template>
  <div class="calendar">
    <h1>
      <i class="el-icon-arrow-left pointer" @click="previousMonth()"></i>
      {{selectedMonthText}} {{selectedYearText}}
      <i class="el-icon-arrow-right pointer" @click="nextMonth()"></i>
    </h1>
    <assign-event @closeAssignEventDialog="dialogVisible = false"
                  :date="selectedDay"
                  :events="events"
                  :dialogVisible="dialogVisible"></assign-event>
    <div class="workspace">
      <tile v-for="item in daysInMonth"
            :key="item.format()"
            @click.native="selectDay(item.date())"
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
  import db from './../../firebaseInit'
  import Tile from './Tile'
  import AssignEvent from './AssignEvent'

  export default {
    name: 'calendar',
    props: ['events'],
    data () {
      return {
        dialogVisible: false,
        selectedDay: null,
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
        db.ref(`events/${event['.key']}/assignments/${assignmentKey}`).remove()
      },
      selectDay (day) {
        this.dialogVisible = true
        this.selectedDay = moment().set('date', day)
      },
      previousMonth () {
        this.selectedMonth = moment(this.selectedMonth.subtract(1, 'month'))
      },
      nextMonth () {
        this.selectedMonth = moment(this.selectedMonth.add(1, 'month'))
      }
    },
    components: {
      AssignEvent,
      Tile
    }

  }
</script>

<style scoped>
  h1 {
    text-align: center;
    text-shadow: 1px 1px 5px rgba(150, 150, 150, 1);
  }

  .calendar {
    width: 80%;
  }

  .workspace {
    display: flex;
    flex-wrap: wrap;
    margin: 2px;
  }
</style>
