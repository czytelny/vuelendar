<template>
 <div> <calendar :events="events"></calendar>
  <sidebar :events="events"
           :loadingInProgress="loadingInProgress">
  </sidebar>
  <mobile-sidebar></mobile-sidebar></div>
</template>

<script>
  export default {
    name: ''
  }
</script>

<style>

</style>
