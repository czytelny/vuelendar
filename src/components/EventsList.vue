<template>
  <div>

    <el-collapse v-model="activeName" accordion>
      <el-collapse-item :name="event['.key']" v-for="event in events" :key="event['.key']">
        <template slot="title" class="title">
          <span class="color-icon"
                :style="{'background-color': event.color}"
                @click="showColorPicker(event.color)"
          ></span>
          {{event.name}}
          <i class="el-icon el-icon-delete" @click.stop="removeEvent(event['.key'])"></i>

        </template>
        <div>In this month:</div>
        <div>Days since last:</div>
        <div>Longest strike:</div>
      </el-collapse-item>
    </el-collapse>
    <div @click="hideColorPicker()">
      <sketch-picker v-if="colorPickerVisible"
                     v-model="pickedColor"
      ></sketch-picker>
    </div>
  </div>
</template>

<script>
  import { Sketch } from 'vue-color'

  export default {
    name: 'EventsList',
    props: ['events'],
    data () {
      return {
        activeName: null,
        pickedColor: '',
        colorPickerVisible: false
      }
    },
    methods: {
      removeEvent (eventId) {
        this.$emit('removeEvent', eventId)
      },
      showColorPicker (color) {
        this.colorPickerVisible = true
        this.pickedColor = color
      },
      hideColorPicker () {
//        this.colorPickerVisible = false
        const eventId = this.activeName
        const color = this.pickedColor.hex
        console.log(eventId, color)
        this.$emit('changeColor', {eventId, color})
      }
    },
    components: {
      'sketch-picker': Sketch
    }
  }
</script>

<style>
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

  .color-icon:hover {
    border-radius: 50%;
  }

  .el-icon {
    border: 1px solid #fff;
    border-radius: 2px;
    padding: 3px;
    transition: all .3s;
    float: right;
    margin: 10px;
  }

  .el-icon:hover {
    border: 1px solid #cecece;
    border-radius: 50%;
  }
</style>
