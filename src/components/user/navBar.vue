<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Username</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            ><router-link
              :class="[
                currentRoute.includes('/user/home')
                  ? 'link-active'
                  : 'link-normal',
              ]"
              to="/user/home"
              >Home</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link
              :class="[
                currentRoute.includes('datasets')
                  ? 'link-active'
                  : 'link-normal',
              ]"
              to="/user/datasets"
              >Datasets</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><b-icon
              icon="power"
              class="link-normal"
              aria-hidden="true"
            ></b-icon>
            <a class="link-normal">Logout</a></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {};
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
  },
  created() {
    console.log(this.$route.path);
  },
};
</script>

<style scoped>
.link-active {
  margin-top: 1.5rem;
  color: yellow;
  text-decoration: none;
}
.link-normal {
  color: white;
  text-decoration: none;
}
</style>
