<template>
  <div>
       <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="list-group list-group-flush">
        </div>
      </div>
      <!-- /#sidebar-wrapper -->
      <!-- Page Content -->
      <div id="page-content-wrapper">
        <nav
          class="
            navbar navbar-expand-lg navbar-secondary
            p-1
            bg-light
            border-bottom
          "
        >
          <button
            class="btn btn-secondary ml-2"
            id="menu-toggle"
            style="font-size: 0.9rem"
          >
            Toggle side navigation
          </button>
        </nav>
        <div class="p-3 content-view container">
          <router-view></router-view>
        </div>
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
  </div>
  </div>
</template>

<script>
import "jquery/dist/jquery.min.js";
import $ from "jquery";
export default {
 mounted() {
    //toggle sidebar
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  },
}
</script>

<style>
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -20rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 20rem;
}

#page-content-wrapper {
  min-width: 100vw;
  height: 100%;
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
    height: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -20rem;
  }
}
.bg-light {
  background-color: #f8f9fa !important;
}
#page-content-wrapper {
  background-color: white;
  overflow: fixed;
}
.link-normal {
  color: #272727;
}
.link-active {
  color: #007fff;
  background-color: #0080ff0e;
}

.custom-link {
  border-bottom: solid 1px #dee2e6;
}
.custom-link:hover {
  background-color: #f8f9fa;
  text-decoration: none;
}
.content-view {
  width: 100%;
  height: 85vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>