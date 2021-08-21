<template>
  <div class="">
      <p class="text-left p-0 m-0">Labeling Progress From All Sites</p>
      <hr class="my-1">
      <b-row cols="3" cols-sm="1" cols-md="3">
          <b-col v-for="site in sites" :key="site.id">
            <doughnut-chart :labelled="site.labelledCases" :unlabelled="site.unLabelledCases"></doughnut-chart>
          </b-col>
      </b-row>
  </div>
</template>

<script>
// import doughnutChart from "@/components/charts/doughnutChart.vue";
import DoughnutChart from '../../components/charts/doughnutChart.vue';
export default {
    components: {
        DoughnutChart
    },
    data(){
        return {sites: [
            {id: 1,name:"Gynecologists", labelledCases: 50, unLabelledCases: 50},
            {id: 2,name:"Mayuge", labelledCases: 10, unLabelledCases: 150},
            {id: 3,name:"Mbarara", labelledCases: 250, unLabelledCases: 40},
            {id: 4,name:"UCI", labelledCases: 450, unLabelledCases: 450},
            {id: 5,name:"Jinja", labelledCases: 150, unLabelledCases: 0},
            {id: 6,name:"Arua", labelledCases: 500, unLabelledCases: 50},
        ]
    }}
}
</script>

<style>

</style>