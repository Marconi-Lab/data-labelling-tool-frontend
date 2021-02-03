<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>

    <vue-good-table
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
            :to="`/user/datasets/${props.row._id}`"
            >{{ props.row.name }}</router-link
          >
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import datasets from "@/services/datasets.js";
import { VueGoodTable } from "vue-good-table";

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
      datasets,
    };
  },
};
</script>

<style></style>
