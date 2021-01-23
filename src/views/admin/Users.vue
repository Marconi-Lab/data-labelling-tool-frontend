<template>
  <div class="mx-3 mt-2">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :pagination-options="{
        enabled: true,
        perPage: 8,
      }"
      :search-options="{
        enabled: true,
        placeholder: 'Search this table',
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'datasets'">
          <span>{{ props.row.datasets }}</span
          ><b-icon
            icon="plus"
            variant="success"
            class="dataset-icon"
            style="float: right; font-weight: bold; font-size: 1.3rem;"
            v-b-modal.modal-center
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
      <b-nav v-if="deletingSelected">
        <b-nav-item><b-icon icon="trash"></b-icon></b-nav-item>
      </b-nav>
      <b-list-group>
        <b-list-group-item v-for="dataset in currentDatasets" :key="dataset._id"
          >{{ dataset.name
          }}<b-icon
            class="delete-dataset"
            variant="danger"
            icon="trash"
            style="float: right"
            @click="handleDeleteFromList"
          ></b-icon>
        </b-list-group-item>
        <p class="text-info mt-2 mb-0">Select dataset to add</p>
        <b-form-select
          v-model="selected"
          :options="options"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
          aria-placeholder="Select dataset to add"
        ></b-form-select>
      </b-list-group>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button size="sm" variant="outline-info" @click="handleDatasetUpdate"
          >update</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import rows from "@/services/users";

export default {
  name: "users-table",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Contact",
          field: "contact",
        },
        {
          label: "Datasets",
          field: "datasets",
        },
        {
          label: "Record",
          field: "record",
        },
      ],
      rows,
      options: ["dataset1", "dataset2"],
      deletingSelected: false,
      selected: "",
      currentDatasets: [
        { _id: "1", name: "dataset1" },
        { _id: "2", name: "dataset2" },
      ],
    };
  },
  methods: {
      handleDeleteFromList(){},
      handleDatasetUpdate(){}
  },
};
</script>

<style scoped>
.dataset-icon:hover {
  cursor: pointer;
  border: solid 1px rgb(148, 255, 148);
  background-color: rgb(148, 255, 148);
  border-radius: 1.4rem;
}
.dataset-icon:visited {
  border: rgb(148, 255, 148);
}
.delete-dataset:hover {
  cursor: pointer;
}
</style>
