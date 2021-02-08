<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <b-nav>
      <b-nav-item
        active
        style="position: absolute; z-index: 2222; right:0; top: 3.3em;"
        ><b-btn variant="info" v-b-modal.modal-center>
          Add <b-icon icon="plus" style="float: right"></b-icon></b-btn
      ></b-nav-item>
    </b-nav>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :pagination-options="{
        enabled: true,
        perPage: 7,
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
          <router-link
            class="mb-0 dataset text-info"
            style=""
            :to="`/admin/datasets/${props.row.id}`"
            >{{ props.row.name }}</router-link
          >
        </span>
        <span v-if="props.column.field == 'progress'">
          <b-progress
            :value="props.row.progress * 100"
            variant="info"
            height="0.5em"
          ></b-progress>
        </span>
        <span v-if="props.column.label == 'download'">
          <!-- <span>{{ props.row.download }}</span
          > -->
          <b-icon
            icon="download"
            variant="info"
            class="download-icon"
            style="float: left; font-weight: bold; font-size: 1.3rem;"
          ></b-icon>
        </span>
        <span v-if="props.column.label == 'delete'">
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
    <b-modal
      id="modal-center"
      centered
      title="Modify Datasets"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <b-form-input
        v-model="title"
        placeholder="Enter Dataset title"
      ></b-form-input>
      <b-form-input
        v-model="classes"
        placeholder="Enter classes, e.g (Positive, negative, not sure)"
        class="mt-3"
      ></b-form-input>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button size="sm" variant="outline-info" @click="handleDatasetUpdate"
          >Submit</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
// import datasets from "@/services/datasets.js";
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
      title: "",
      classes: "",
      columns: [
        { field: "name", label: "Dataset" },
        { field: "progress", label: "Progress" },
        { field: "id", label: "download" },
        { field: "id", label: "delete" },
      ],
      rows: {},
    };
  },
  computed: {
    ...mapGetters(["allDatasets"]),
  },
  created() {
    this.$store.dispatch("getAllDatasets").then(() => {
      this.rows = this.allDatasets;
    });
  },
};
</script>

<style scoped>
.dataset:hover {
  cursor: "pointer";
  color: teal;
}
</style>
