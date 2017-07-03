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
      <el-row>
        <el-col :xs="12" :sm="8" :md="4" :lg="3"
                v-for="day in daysInMonth"
                :key="day">
          <tile @click.native="selectDay(day)"
                @removeAssignment="removeAssignment"
                :fullDate="fullDate(day)"
                :events="events"
                :dayNumber="day">
          </tile>
        </el-col>
      </el-row>

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
        return moment().daysInMonth()
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
      fullDate (day) {
        return moment().year(this.selectedMonth.format('YYYY')).month(this.selectedMonth.format('MMMM')).date(day)
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
    margin: 2px;
  }
</style>
