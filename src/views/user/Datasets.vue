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
    <div v-else>
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
            <router-link
              class="text-info"
              :to="`/user/datasets/${props.row.id}`"
              >{{ props.row.name }}</router-link
            >
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
      fields: [{ field: "name", label: "dataset" }],
      datasets: {},
      processing: true,
    };
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

<style></style>
