<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ['labelled', 'unlabelled'],
  data(){
      return{
          data: {
              labels: ["total cases", "labeled cases"],
              datasets: [{
                  label: 'dataset 1',
                  backgroundColor: ["#52a6fa", "#20c997"],
                  data: [this.labelled, this.unlabelled]
              }]
          },
          options: {
              cutoutPercentage: 85
          }
      }
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>

<style>
</style>