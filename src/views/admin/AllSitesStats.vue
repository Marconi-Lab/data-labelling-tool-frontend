<template>
  <div class="">
    <h4 class="text-left p-0 m-0 pb-1">Labeling Progress From All Sites</h4>
    <hr class="my-1" />
    <b-row cols="1" cols-md="2" cols-lg="3">
      <b-col v-for="site in sites" :key="site.id">
        <b-card class="mt-2 mb-2 custom-card">
            <h6>{{site.name}}</h6>
          <doughnut-chart
            :labelled="site.labelledCases"
            :unlabelled="site.unLabelledCases"
          ></doughnut-chart>
          <b-card-text class="mt-2"
            >{{ site.labelledCases }} of
            {{
              site.unLabelledCases + site.labelledCases
            }}
            labelled.</b-card-text
          >
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import doughnutChart from "@/components/charts/doughnutChart.vue";
import DoughnutChart from "../../components/charts/doughnutChart.vue";
export default {
  components: {
    DoughnutChart,
  },
  data() {
    return {
      sites: [
        {
          id: 1,
          name: "Gynecologists",
          labelledCases: 50,
          unLabelledCases: 50,
        },
        { id: 2, name: "Mayuge", labelledCases: 10, unLabelledCases: 150 },
        { id: 3, name: "Mbarara", labelledCases: 250, unLabelledCases: 40 },
        { id: 4, name: "UCI", labelledCases: 450, unLabelledCases: 450 },
        { id: 5, name: "Jinja", labelledCases: 150, unLabelledCases: 0 },
        { id: 6, name: "Arua", labelledCases: 500, unLabelledCases: 50 },
      ],
    };
  },
};
</script>

<style>
.custom-card{
    box-shadow: 12px 10px 7px -10px rgba(0,0,0,0.41);
-webkit-box-shadow: 12px 10px 7px -10px rgba(0,0,0,0.41);
-moz-box-shadow: 12px 10px 7px -10px rgba(0,0,0,0.41);
}
</style>