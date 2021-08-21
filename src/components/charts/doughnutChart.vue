<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ['labelled', 'unlabelled'],
  data(){
      return{
          data: {
              labels: ["labeled cases", " Un labeled cases"],
              datasets: [{
                  label: 'dataset 1',
                  backgroundColor: ["#20c997", "#52a6fa"],
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