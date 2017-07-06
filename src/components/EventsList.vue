<template>
  <div class="eventList">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item :name="event['.key']" v-for="event in events" :key="event['.key']">
        <template slot="title" class="title">
          <span class="color-icon"
                :style="{'background-color': event.color}"
                @click.stop="showColorPicker(event)"
          ></span>
          {{event.name}}
          <i class="el-icon float-right el-icon-delete" @click.stop="removeEvent(event['.key'])"></i>
        </template>
        <el-row>
          <el-col :span="12">In this month</el-col>
          <el-col :span="4" class="bold">{{assignmentsInThisMonth(event)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">Days since last</el-col>
          <el-col :span="4" class="bold">{{daysSinceLast(event)}}</el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div class="color-picker-container" v-if="colorPickerVisible">
      <chrome-picker
        v-model="pickedColor"></chrome-picker>
      <el-button @click="hideColorPicker()" type="primary" size="small">Pick color</el-button>
    </div>
  </div>
</template>

<script>
  import { Chrome } from 'vue-color'
  import _filter from 'lodash/filter'
  import _each from 'lodash/each'
  import moment from 'moment'
  import { MessageBox, Message } from 'element-ui'

  export default {
    name: 'EventsList',
    props: ['events'],
    data () {
      return {
        activeName: null,
        pickedColor: '',
        pickedEvent: null,
        colorPickerVisible: false
      }
    },
    methods: {
      removeEvent (eventId) {
        MessageBox.confirm('This will permanently delete the event and all assignments. Continue?', 'Warning', {
          confirmButtonText: 'Yup',
          cancelButtonText: 'No!',
          type: 'warning'
        }).then(() => {
          this.$emit('removeEvent', eventId)
          Message.success({
            message: 'Event removed'
          })
        }).catch(() => {})
      },
      showColorPicker (event) {
        this.colorPickerVisible = true
        this.pickedEvent = event
        this.pickedColor = event.color
      },
      hideColorPicker () {
        this.colorPickerVisible = false
        const color = this.pickedColor.hex ? this.pickedColor.hex : this.pickedColor
        this.$emit('changeColor', {eventId: this.pickedEvent['.key'], color})
      },
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
    },
    components: {
      'chrome-picker': Chrome
    }
  }
</script>

<style>
  .eventList {
    position: relative;
  }

  .bold {
    font-weight: bold;
  }

  .color-icon {
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 3px;
    box-shadow: 1px 1px 1px rgb(211, 211, 211);
    transition: all .3s;
    margin-right: 3px;
    margin-bottom: -2px;
  }

  .color-picker-container {
    box-sizing: border-box;
    padding-left: 13px;
    padding-top: 13px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(251, 251, 251, 0.8);
    text-align: center;
  }

  .color-picker-container button {
    margin-top: 3px;
  }

  .color-icon:hover {
    border-radius: 50%;
  }

  .el-icon {
    border: 1px solid #f9f9f9;
    border-radius: 3px;
    padding: 3px;
    transition: all .3s;
    margin: 10px;
    background-color: rgba(255, 255, 255, 0.75);
  }

  .el-icon:hover {
    border: 1px solid #cecece;
    border-radius: 50%;
  }
</style>
