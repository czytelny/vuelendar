<template>
  <div class="tile" :class="{'today': isToday}">
    {{dayNumber}}
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'tile',
    props: {
      dayNumber: Number,
      date: Object
    },
    computed: {
      isToday () {
        return this.dayNumber === moment().get('day')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tile {
    border: 1px solid #cecece;
    width: 100px;
    height: 100px;
    transition: all .3s;
    cursor: pointer;
    border-radius: 2px;
    margin:1px;
  }
  .tile:hover {
    border: 1px solid #4fc08d;
    background-color: rgba(79, 192, 141, 0.09);
  }

  .today{
    background-color: rgba(79, 192, 141, 0.25);
  }
</style>
