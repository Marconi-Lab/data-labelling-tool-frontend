<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <b-nav>
      <b-nav-item active
        ><b-btn variant="info"> Add <b-icon icon="plus" style="float: right"></b-icon
      ></b-btn></b-nav-item>
    </b-nav>
    <vue-good-table
      :columns="columns"
      :rows="rows"
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
        <span v-if="props.column.field=='name'">
         <p class="mb-0">{{props.row.name}}</p>
        </span>
        <span v-if="props.column.field=='progress'">
          <b-progress :value="props.row.progress*100" variant="info" height="0.5em"></b-progress> 
        </span>
        <span v-if="props.column.field == 'download'">
          <!-- <span>{{ props.row.download }}</span
          > -->
          <b-icon 
            icon="download"
            variant="info"
            class="download-icon"
            style="float: left; font-weight: bold; font-size: 1.3rem;"
          ></b-icon>
        </span>
        <span v-if="props.column.field == '_id'">
          <!-- <span>{{ props.row.download }}</span
          > -->
          <b-icon 
            icon="trash"
            variant="danger"
            class="delete-icon"
            style="float: left; font-weight: bold; font-size: 1.3rem;"
          ></b-icon>
        </span>
      </template>
    </vue-good-table>

    <!-- <b-table :fields="fields" :items="datasets">
      <template #cell(index)="data">
        <p style="max-width: 200px;" class="text-left pl-3">
          {{ data.index + 1 }}
        </p>
      </template>
      <template #head(index)="data">
        <p style="max-width: 200px;" class="text-left pl-3">{{ data.label }}</p>
      </template>

      <template #cell(name)="data">
        <p class="text-info text-left">
          <router-link :to="`/user/datasets/${data.item._id}`">{{
            data.value
          }}</router-link>
        </p>
      </template>

      <template #head(name)="data">
        <p class="text-left">{{ data.label }}</p>
      </template>
    </b-table> -->
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
      columns: [
        { field: "name", label: "Dataset" },
        { field: "progress", label: "Progress" },
        { field: "download", label: "download" },
        { field: "_id", label: "delete" },
      ],
      rows: datasets,
    };
  },
};
</script>

<style></style>
