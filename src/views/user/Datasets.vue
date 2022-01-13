<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <div
      v-if="processing"
      class="d-flex align-items-center justify-content-center"
      style="height: 65vh"
    >
      <Spinner />
    </div>
    <div v-else style="over-flow: hidden;">
      <vue-good-table
        v-if="datasets && datasets.length"
        :columns="fields"
        :rows="datasets"
        :pagination-options="{
          enabled: true,
          perPage: 5,
        }"
        :search-options="{
          enabled: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: false,
        }"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'name'">
            <!-- <span>{{ props.row.download }}</span
          > -->
            <b-icon
              icon="folder"
              variant="info"
              style="float: left; font-weight: bold; font-size: 1.3rem; margin-right: 20px; margin-top: 4px;"
            >
            </b-icon>
            <a
              class="text-info nav-link p-0"
              @click="handleDatasetClick(props.row.id)"
              >{{ props.row.name }}</a
            >
          </span>
          <span
            v-if="props.column.field == 'progress'"
            class="row p-0"
            style="min-width: 200px;"
          >
            <p class="col-3 pb-0 m-0 text-info">
              {{ Math.round(props.row.progress) + "%" }}
            </p>
            <div class="col-8 p-1 pt-2">
              <b-progress
                :value="props.row.progress"
                variant="info"
                height="0.5em"
              >
              </b-progress>
            </div>
          </span>
        </template>
      </vue-good-table>
      <h4 v-else class="mt-5 text-danger">
        You are currently not assigned any datasets, check again later!
      </h4>
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import { mapGetters } from "vuex";

export default {
  name: "user-datasets",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      items: [
        {
          text: "datasets",
          href: "/user/datasets",
          active: true,
        },
      ],
      fields: [
        { field: "name", label: "dataset" },
        { field: "progress", label: "progress" },
      ],
      datasets: {},
      processing: true,
    };
  },
  methods: {
    handleDatasetClick(id){
      let project_type = "label"
      if(project_type == "label"){
        this.$router.push({name: "label-dataset", params:{id: id}})
      }else{
        this.$router.push({name:"data-item", params: {id: id}})
      }
    }
  },
  computed: {
    ...mapGetters(["assignedDatasets"]),
  },
  created() {
    this.$store.dispatch("getUserDatasets").then(() => {
      this.datasets = this.assignedDatasets;
      this.processing = false;
    });
  },
};
</script>

<style>
a:hover{
  cursor: pointer;
}
</style>
