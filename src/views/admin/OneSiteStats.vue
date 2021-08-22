<template>
  <div>
    <h5 class="text-left p-0 m-0">{{ currentSite }}</h5>
    <hr class="my-1" />
    <div
      v-if="processing"
      class="d-flex align-items-center justify-content-center"
      style="height: 65vh"
    >
      <Spinner />
    </div>
    <b-row
      v-else
      v-for="nurse in nurses"
      :key="nurse.id"
      class="custom-row mx-2 mt-3 p-4"
    >
      <b-col cols sm="8">
        <h5>{{ nurse.name }}</h5>
        <hr class="m-0 mb-3" />
        <div v-for="dataset in nurse.datasets" :key="dataset.id">
          <p class="text-left mb-1" style="font-size: 0.9rem">
            Dataset {{ dataset.id }} ({{ dataset.labelled }} of
            {{ dataset.labelled + dataset.unlabelled }}) cases labeled.
          </p>
          <b-progress
            :value="dataset.labelled"
            :max="dataset.labelled + dataset.unlabelled"
            style="background-color: #dee2e6"
            variant="success"
            show-value
            class="mb-3"
          ></b-progress>
        </div>
        <h6>
          In total
          <strong
            >{{ nurse.totalLabelled }} /
            {{ nurse.totalLabelled + nurse.totalUnlabelled }}</strong
          >
          cases annotated.
        </h6>
      </b-col>
      <b-col col sm="4" style="border-left: solid 1px #dee2e6">
        <doughnut-chart
          :labelled="nurse.totalLabelled"
          :unlabelled="nurse.totalUnlabelled"
        ></doughnut-chart>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DoughnutChart from "../../components/charts/doughnutChart.vue";
import axios from "../../store/axios_setup";
export default {
  components: {
    DoughnutChart,
  },
  data() {
    return {
      processing: true,
      nurses: [
        {
          id: 1,
          datasets: [
            { id: 1, labelled: 140, unlabelled: 0 },
            { id: 3, labelled: 14, unlabelled: 100 },
            { id: 4, labelled: 0, unlabelled: 140 },
          ],
          name: "Anna",
          totalLabelled: 304,
          totalUnlabelled: 240,
        },
        {
          id: 2,
          datasets: [
            { id: 1, labelled: 140, unlabelled: 0 },
            { id: 2, labelled: 150, unlabelled: 0 },
            { id: 3, labelled: 14, unlabelled: 100 },
            { id: 4, labelled: 0, unlabelled: 140 },
          ],
          name: "Jane",
          totalLabelled: 304,
          totalUnlabelled: 240,
        },
        {
          id: 3,
          datasets: [
            { id: 1, labelled: 140, unlabelled: 0 },
            { id: 2, labelled: 150, unlabelled: 0 },
            { id: 3, labelled: 14, unlabelled: 100 },
            { id: 4, labelled: 0, unlabelled: 140 },
          ],
          name: "Mary",
          totalLabelled: 304,
          totalUnlabelled: 240,
        },
        {
          id: 4,
          datasets: [
            { id: 1, labelled: 140, unlabelled: 0 },
            { id: 2, labelled: 150, unlabelled: 0 },
            { id: 3, labelled: 14, unlabelled: 100 },
            { id: 4, labelled: 0, unlabelled: 140 },
          ],
          name: "Collin",
          totalLabelled: 304,
          totalUnlabelled: 240,
        },
      ],
    };
  },
  methods: {
    getSiteStats(site) {
      this.processing = true;
      axios.get(`/admin/dashboard/${site}/`).then((res) => {
        this.nurses = res.data;
        this.processing = false;
      });
    },
  },
  computed: {
    currentSite() {
      const path = this.$route.path;
      if (path.includes("uci")) {
        return "UCI";
      } else if (path.includes("mayuge")) {
        return "Mayuge";
      } else if (path.includes("mbarara")) {
        return "Mbarara";
      } else if (path.includes("jinja")) {
        return "Jinja";
      } else if (path.includes("gynecologist")) {
        return "Gynecologists";
      } else {
        return "Arua";
      }
    },
  },
  mounted() {
    let site = this.$route.params.site;
    this.getSiteStats(site);
  },
  watch: {
    "$route.params.site"(newSite) {
      this.getSiteStats(newSite);
    },
  },
};
</script>

<style>
.custom-row {
  border: solid 1px #dee2e6;
  border-radius: 0.5rem;
  box-shadow: 12px 10px 7px -10px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 12px 10px 7px -10px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 12px 10px 7px -10px rgba(0, 0, 0, 0.41);
}
</style>