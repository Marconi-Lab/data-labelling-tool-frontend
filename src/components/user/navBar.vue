<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>{{ username }}</b-navbar-brand>

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
    return {
      username: "",
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
  },
  created() {
    this.username = JSON.parse(localStorage.getItem("user")).username;
  },
};
</script>

<style scoped>
.link-active {
  margin-top: 1.5rem;
  color: rgb(252, 252, 143);
  text-decoration: none;
}
.link-normal {
  color: rgb(232, 232, 232);
  text-decoration: none;
}
</style>
