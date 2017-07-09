<template>
  <div class="tile" :class="{'today': isToday,
                              'weekend': isWeekend,
                              'sunday': isSunday,
                              'isPastMonth': isPastMonth,
                              'isDayInFuture': isDayInFuture}">
    <div><span class="day">{{day.date()}}</span> <span v-if="isToday">(today)</span></div>

    <span v-for="event in todayEvents">
            <span v-for="assignment in todayAssignments(event)">
              <el-tooltip :content="event.name"
                          placement="top-start">
              <span class="color-icon"
                    @click.stop="removeAssignment(event, assignment)"
                    :style="{'background-color': event.color}"></span>
           </el-tooltip></span>

           </span>
  </div>
</template>

<script>
  import moment from 'moment'
  import _filter from 'lodash/filter'

  export default {
    name: 'tile',
    props: ['day', 'events', 'selectedMonth'],
    computed: {
      todayEvents () {
        return _filter(this.events,
          item => Object.keys(item.assignments || {}).find(
            key => moment(item.assignments[key]).isSame(this.day, 'day')
          )
        )
      },
      isWeekend () {
        const dayOfWeek = this.day.day()
        return (dayOfWeek === 6) || (dayOfWeek === 0)
      },
      isToday () {
        return this.day.isSame(moment(), 'day')
      },
      isSunday () {
        return (this.day.day() === 0)
      },
      isPastMonth () {
        return this.day.isBefore(this.selectedMonth, 'month')
      },
      isDayInFuture () {
        return this.day.isAfter(moment(), 'day')
      }
    },
    methods: {
      removeAssignment (event, assignment) {
        this.$emit('removeAssignment', {event, assignment})
      },
      todayAssignments (event) {
        return _filter(event.assignments,
          item => moment(item).isSame(moment(this.day), 'day'))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tile {
    border: 1px solid #cecece;
    min-height: 100px;
    min-width: 60px;
    width: 13%;
    transition: all .5s;
    border-radius: 3px;
    margin: 1px;
    padding: 3px;
    background-color: #fcfcfc;
    cursor: pointer;
  }

  .tile:hover {
    border: 1px solid #4fc08d;
    background-color: rgba(79, 192, 141, 0.09);
  }

  .today {
    background-color: rgba(79, 192, 141, 0.25);
    border: 1px solid #4fc08d;
  }

  .today .day {
    background-color: #4fc08d;
    border-radius: 100%;
    width: 24px;
    height: 24px;
    display: inline-block;
    color: white;
    padding-top: 2px;
    box-sizing: border-box;
    text-align: center;
  }

  .weekend {
    background-color: #f1f1f1;
  }

  .sunday {
    color: #FF4949;
  }

  .isPastMonth {
    background-color: #dbdbdb;
    opacity: .25;
    text-shadow: 1px 1px 2px rgba(62, 62, 62, 0.7);
  }

  .isDayInFuture{
    opacity: .15;
    -moz-box-shadow: 0 0 3px rgba(40, 58, 79, 0.51);
    -webkit-box-shadow: 0 0 3px rgba(40, 58, 79, 0.51);
    box-shadow: inset 0 0 3px rgba(40, 58, 79, 0.51);
  }
</style>
