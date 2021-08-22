<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="list-group list-group-flush">
          <router-link
            to="/admin/dashboard/allsites"
            :class="[
              currentRoute.includes('/admin/dashboard/allsites')
                ? 'link-active'
                : 'link-normal',
              'text-left',
              'p-3',
              'pl-3',
              'custom-link',
            ]"
            >All Sites</router-link
          >
          <router-link
            to="/admin/dashboard/mayuge"
            :class="[
              currentRoute.includes('/admin/dashboard/mayuge')
                ? 'link-active'
                : 'link-normal',
              'text-left',
              'p-3',
              'pl-3',
              'custom-link',
            ]"
            >Mayuge</router-link
          >
          <router-link
            to="/admin/dashboard/uci"
            :class="[
              currentRoute.includes('/admin/dashboard/uci')
                ? 'link-active'
                : 'link-normal',
              'text-left',
              'p-3',
              'pl-3',
              'custom-link',
            ]"
            >UCI</router-link
          >
          <router-link
            to="/admin/dashboard/mbarara"
            :class="[
              currentRoute.includes('/admin/dashboard/mbarara')
                ? 'link-active'
                : 'link-normal',
              'text-left',
              'p-3',
              'pl-3',
              'custom-link',
            ]"
            >Mbarara</router-link
          >
          <router-link
            to="/admin/dashboard/jinja"
            :class="[
              currentRoute.includes('/admin/dashboard/jinja')
                ? 'link-active'
                : 'link-normal',
              'text-left',
              'p-3',
              'pl-3',
              'custom-link',
            ]"
            >Jinja</router-link
          >
          <router-link
            to="/admin/dashboard/arua"
            :class="[
              currentRoute.includes('/admin/dashboard/arua')
                ? 'link-active'
                : 'link-normal',
              'text-left',
              'p-3',
              'pl-3',
              'custom-link',
            ]"
            >Arua</router-link
          >
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
            Toggle Dashboard
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
</template>
<script>
import "jquery/dist/jquery.min.js";
import $ from "jquery";
export default {
  data() {
    return {};
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
  },
  mounted() {
    //toggle sidebar
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  },
};
</script>
<style scoped>
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
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
  width: 15rem;
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
    margin-left: -15rem;
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