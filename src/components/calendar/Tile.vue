<template>
  <div class="tile" :class="{'today': isToday,
                              'weekend': isWeekend,
                              'sunday': isSunday,
                              'isPastMonth': isPastMonth}">
    <div>{{day.date()}} <span v-if="isToday">(today)</span></div>

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

  .weekend {
    background-color: #f1f1f1;
  }

  .sunday {
    color: #FF4949;
  }

  .isPastMonth {
    background-color: #dbdbdb;
    opacity: .25;
  }
</style>
