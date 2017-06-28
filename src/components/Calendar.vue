<template>
<div class="calendar">
  <h1>{{currentMonth}}</h1>
  <div class="workspace">
    <tile v-for="day in daysInMonth"
          :key="day"
          :dayNumber="day"></tile>
  </div>
</div>
</template>

<script>
  import moment from 'moment'
  import Tile from './Tile'

  export default {
    name: 'calendar',
    computed: {
      daysInMonth () {
        return moment().daysInMonth()
      },
      currentMonth () {
        return moment().format('MMMM')
      }
    },
    components: {
      Tile
    }

  }
</script>

<style scoped>
  h1{
    text-align: center;
    text-shadow: 1px 1px 5px rgba(150, 150, 150, 1);
  }
  .calendar {
    width: 80%;
  }

  .workspace{
    display: flex;
    flex-wrap: wrap;
    margin: 2px;
  }

</style>
