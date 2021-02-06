<template>
  <div>
    <b-container class="">
      <b-row class="mt-5">
        <b-col md="6" class="my-3">
          <b-card
            header-tag="header"
            border-variant="info"
            footer-tag="footer"
            style="height: 50vh"
            body-text-variant="info"
          >
            <b-row align-v="center" style="height: 100%">
              <h1 style="margin: auto">Record {{ userHome.images }}</h1>
            </b-row>
          </b-card>
        </b-col>
        <b-col md="6" class="my-3">
          <router-link style="text-decoration: none" to="/user/datasets">
            <b-card
              text-variant="info"
              border-variant="info"
              style="height: 50vh"
            >
              <b-row align-v="center" style="height: 100%">
                <h1 style="margin: auto">Datasets {{ userHome.datasets }}</h1>
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
      record: 0,
      datasets: 0,
    };
  },
  computed: {
    ...mapGetters(["userHome"]),
  },
  methods: {
    ...mapActions(["getuserHome"]),
  },
  created() {
    this.getuserHome();
    console.log("Stats", this.userHome);
  },
};
</script>

<style></style>
