<template>
  <div>
    <div class="tile" :class="{'today': isToday}">
      <div>{{dayNumber}}</div>
      <span v-for="event in todayEvents">
           <el-tooltip :content="event.name"
                       placement="top-start">
           <span class="color-icon"
                 :style="{'background-color': event.color}"></span>
             </el-tooltip>
      </span>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'tile',
    props: ['dayNumber', 'fullDate', 'events'],
    computed: {
      todayEvents () {
        return this.events.filter((item) => {
          if (!item.assignments) {
            return false
          }
          return Object.keys(item.assignments).find((key) => {
            return moment(item.assignments[key]).isSame(moment(this.fullDate), 'd')
          })
        })
      },
      isToday () {
        return this.dayNumber === moment().date()
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
