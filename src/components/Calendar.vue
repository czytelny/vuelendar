<template>
  <div class="calendar">
    <h1>{{currentMonth}}</h1>
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
  import Tile from './Tile'
  import AssignEvent from './AssignEvent'

  export default {
    name: 'calendar',
    props: ['events'],
    data () {
      return {
        dialogVisible: false,
        selectedDay: null,
        selectedMonth: moment().format('MMMM')
      }
    },
    computed: {
      daysInMonth () {
        return moment().daysInMonth()
      },
      currentMonth () {
        return moment().format('MMMM')
      },
      eventsPerDay (dayNumber) {
        return this.events
      }
    },
    methods: {
      fullDate (day) {
        return moment().month(this.selectedMonth).date(day)
      },
      selectDay (day) {
        this.dialogVisible = true
        this.selectedDay = moment().set('date', day)
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
