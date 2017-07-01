<template>
  <div class="calendar">
    <h1>{{currentMonth}}</h1>
    <el-dialog
      title="Add event"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">

      <div v-for="event in events" :key="event['.key']" class="pointer clickable">
         <span class="color-icon"
               :style="{'background-color': event.color}"
         ></span>
        {{event.name}}
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Save</el-button>
      </span>
    </el-dialog>

    <div class="workspace">
      <el-row>
        <el-col :xs="12" :sm="8" :md="4" :lg="3"
                v-for="day in daysInMonth"
                :key="day">
          <tile @click.native="dialogVisible = true"
                :dayNumber="day">
          </tile>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import db from './../firebaseInit'
  import moment from 'moment'
  import Tile from './Tile'

  // TODO split to separate component
  let eventsRef = db.ref('events')

  export default {
    name: 'calendar',
    data () {
      return {
        dialogVisible: false,
        loadingInProgress: true
      }
    },
    firebase: {
      events: {
        source: eventsRef,
        readyCallback: function () {
          this.loadingInProgress = false
        }
      }
    },
    computed: {
      daysInMonth () {
        return moment().daysInMonth()
      },
      currentMonth () {
        return moment().format('MMMM')
      }
    },
    methods: {
      handleClose () {
        console.log('hadnling close')
      }
    },
    components: {
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

  .pointer {
    cursor: pointer;
  }
  .clickable {
    transition: all .3s;
  }
  .clickable:hover {
    color: #20A0FF;
  }

</style>
