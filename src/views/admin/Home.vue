<template>
  <div>
    <b-container class="">
      <b-row class="mt-5">
        <b-col md="6" class="my-3">
          <router-link style="text-decoration: none" to="/admin/datasets">
            <b-card
              border-variant="info"
              text-variant="info"
              header-tag="header"
              footer-tag="footer"
              style="height: 50vh"
            >
              <b-row align-v="center" style="height: 100%">
                <h1 style="margin: auto">Datasets {{ adminHome.datasets }}</h1>
              </b-row>
            </b-card>
          </router-link>
        </b-col>
        <b-col md="6" class="my-3">
          <router-link style="text-decoration: none" to="/admin/users">
            <b-card
              border-variant="info"
              text-variant="info"
              header-tag="header"
              footer-tag="footer"
              style="height: 50vh"
            >
              <b-row align-v="center" style="height: 100%">
                <h1 style="margin: auto">Users {{ adminHome.users }}</h1>
              </b-row>
            </b-card>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "home-view",
  components: {},
  data() {
    return {
      users: 0,
      datasets: 0,
    };
  },
  computed: {
    ...mapGetters(["adminHome"]),
  },
  methods: {
    ...mapActions(["getAdminHome"]),
  },
  created() {
    this.getAdminHome();
    console.log("Stats", this.adminHome);
  },
};
</script>

<style></style>
