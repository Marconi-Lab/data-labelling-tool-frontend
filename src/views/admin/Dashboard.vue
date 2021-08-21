<template>
  <div>
  <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="list-group list-group-flush">
          <router-link to="/admin/dashboard/allsites" class="list-group-item list-group-item-action bg-light text-left">All Sites</router-link>
          <router-link to="/admin/dashboard/mayuge" class="list-group-item list-group-item-action bg-light text-left">Mayuge</router-link>
          <router-link to="/admin/dashboard/uci" class="list-group-item list-group-item-action bg-light text-left">UCI</router-link>
          <router-link to="/admin/dashboard/mbarara" class="list-group-item list-group-item-action bg-light text-left">Mbarara</router-link>
          <router-link to="/admin/dashboard/jinja" class="list-group-item list-group-item-action bg-light text-left">Jinja</router-link>
          <router-link to="/admin/dashboard/arua" class="list-group-item list-group-item-action bg-light text-left">Arua</router-link>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->
      <!-- Page Content -->
      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-secondary p-1 bg-light border-bottom">
          <button class="btn btn-info ml-2" id="menu-toggle" style="font-size: 0.9rem;">Toggle Dashboard</button>
        </nav>
        <div class="p-3">
          <router-view></router-view>  
        </div>
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
    </div>
</template>
<script>

import 'jquery/dist/jquery.min.js';
import $ from 'jquery'; 
export default {
 data(){
   return {

   }
 },
 computed: {
   currentRoute: () => this.$route.path
 },
  mounted(){
    //toggle sidebar
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  },
  
}
</script>
<style scoped>
body {
    overflow-x: hidden;
  }
  
  #sidebar-wrapper {
    min-height: 100vh;
    margin-left: -15rem;
    -webkit-transition: margin .25s ease-out;
    -moz-transition: margin .25s ease-out;
    -o-transition: margin .25s ease-out;
    transition: margin .25s ease-out;
  }
  
  #sidebar-wrapper .sidebar-heading {
    padding: 0.875rem 1.25rem;
    font-size: 1.2rem;
  }
  
  #sidebar-wrapper .list-group {
    width: 15rem;
  }
  
  #page-content-wrapper {
    min-width: 100vw;
  }
  
  #wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
  }
  
  @media (min-width: 768px) {
    #sidebar-wrapper {
      margin-left: 0;
    }
  
    #page-content-wrapper {
      min-width: 0;
      width: 100%;
    }
  
    #wrapper.toggled #sidebar-wrapper {
      margin-left: -15rem;
    }
  }
  .bg-light {
    background-color: rgb(248, 248, 248)!important;
}
#page-content-wrapper{background-color: white;}
</style>