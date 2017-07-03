<template>
  <div>
    <div class="tile" :class="{'today': isToday}">
      <div>{{dayNumber}}</div>
      <span v-for="event in todayEvents">
            <span v-for="assignment in todayAssignments(event)">
              <el-tooltip :content="event.name"
                          placement="top-start">
              <span class="color-icon"
                    :style="{'background-color': event.color}"></span>
           </el-tooltip></span>

           </span>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import _filter from 'lodash/filter'

  export default {
    name: 'tile',
    props: ['dayNumber', 'fullDate', 'events'],
    computed: {
      todayEvents () {
        return _filter(this.events,
          item => Object.keys(item.assignments || {}).find(
            key => moment(item.assignments[key]).isSame(this.fullDate, 'day')
          )
        )
      },
      isToday () {
        return this.dayNumber === moment().date()
      }
    },
    methods: {
      todayAssignments (event) {
        return _filter(event.assignments,
          item => moment(item).isSame(moment(this.fullDate), 'day'))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tile {
    border: 1px solid #cecece;
    min-height: 100px;
    min-width: 100px;
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
  }
</style>
