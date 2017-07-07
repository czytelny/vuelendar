<template>
  <div>
    <el-row>
      <el-col :span="12">In this month</el-col>
      <el-col :span="4" class="bold">{{assignmentsInThisMonth(event)}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">Days since last</el-col>
      <el-col :span="4" class="bold">{{daysSinceLast(event)}}</el-col>
    </el-row>
  </div>
</template>

<script>
  import _filter from 'lodash/filter'
  import _each from 'lodash/each'
  import moment from 'moment'

  export default {
    name: 'event-statistics',
    props: ['event'],
    methods: {
      assignmentsInThisMonth (event) {
        return _filter(event.assignments, (item) => moment(item).isSame(moment(), 'month')).length
      },
      daysSinceLast (event) {
        let closestDate = moment('1970-01-01 00:00:00')
        const today = moment().startOf('day')

        if (!event.assignments || event.assignments.length < 2) {
          return 0
        }
        _each(event.assignments, (item) => {
          const itemDate = moment(item)
          if (itemDate.isSame(today, 'day')) {
            closestDate = itemDate
          }
          if (itemDate.isBefore(today, 'day') && (itemDate.isAfter(closestDate))) {
            closestDate = itemDate
          }
        })
        if (closestDate.isSame(moment('1970-01-01 00:00:00'))) {
          return 0
        }
        return today.diff(closestDate, 'days')
      }
    }
  }
</script>

<style>

</style>
