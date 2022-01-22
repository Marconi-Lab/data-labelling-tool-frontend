<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Admin</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            ><router-link
              :class="[
                currentRoute.includes('/project-admin/dashboard')
                  ? 'link-active'
                  : 'link-normal',
              ]"
              to="/project-admin/dashboard"
              >Dashboard</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link
              :class="[
                currentRoute.includes('project-admin/users')
                  ? 'link-active'
                  : 'link-normal',
              ]"
              to="/project-admin/users"
              >Project Users</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link
              :class="[
                currentRoute.includes('project-admin/allusers')
                  ? 'link-active'
                  : 'link-normal',
              ]"
              to="/project-admin/allusers"
              >All Users</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><b-icon
              icon="power"
              class="link-normal"
              aria-hidden="true"
            ></b-icon>
            <a class="link-normal" @click="handleLogout">Logout</a></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "../../store/axios_setup";

export default {
  name: "admin-navbar",
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
  methods: {
    handleLogout(e) {
      this.$store.commit("isLoading", true);
      e.preventDefault();
      axios
        .post(`/auth/logout/`)
        .then((res) => {
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify({}));
          sessionStorage.clear();
          this.$router.push("/");
          this.$store.commit("isLoading", false);
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
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
