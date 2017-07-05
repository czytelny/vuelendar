<template>
  <div class="mobile-sidebar-btn hidden-sm-up">
   <h1><i class="el-icon el-icon-more pointer"></i></h1>
 </div>

</template>

<script>
  export default {
    name: 'MobileSidebar'
  }
</script>

<style scoped>
  .mobile-sidebar-btn {
    right: 2%;
    position: fixed;
    color: #4fc08d;
  }


  @media (min-width: 767px) {
    .hidden-sm-up {
      display: none !important
    }
  }
</style>
