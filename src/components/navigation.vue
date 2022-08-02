<template>
  <b-navbar
    toggleable="lg"
    type="light"
    variant=""
    class="custom-navigation p-0 pt-1"
  >
    <div class="container">
      <b-navbar-brand class="py-0 my-0"
        ><a href="https://marconilab.org"
          ><img class="brand-image" src="../assets/marconi_lab.png" alt="" /></a
      ></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Right aligned nav items -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <router-link
            :class="[
              'router-link',
              currentRoute.includes('login') || currentRoute.includes('signup')
                ? 'not-active'
                : 'active-link',
            ]"
            to="/"
          >
            home</router-link
          >
          <router-link
            :class="[
              'router-link',
              currentRoute.includes('admin') ? 'active-link' : 'not-active',
            ]"
            to="/administrator"
          >
            admin</router-link
          >
          <router-link
            :class="[
              'router-link',
              currentRoute.includes('login') ? 'active-link' : 'not-active',
            ]"
            to="/login"
          >
            signin</router-link
          >
          <router-link
            :class="[
              'router-link',
              currentRoute.includes('signup') ? 'active-link' : 'not-active',
            ]"
            to="/signup"
          >
            signup</router-link
          >
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    currentRoute() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.active-link {
  color: #0275d8;
}
.brand-image {
  height: 4.2rem;
  border-radius: 0.2rem;
}
.button:hover {
  /* color: white; */
}
.custom-navigation {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: white;
  margin-bottom: 20px;
  -webkit-box-shadow: 0px 1px 6px -1px #000000;
  box-shadow: 0px 1px 6px -1px #cccccc;
  z-index: 22;
}
.router-link {
  padding-right: 2rem;
  color: black;
}
.router-link:hover {
  /* color: white; */
  text-decoration: none;
  color: #0275d8;
}
</style>