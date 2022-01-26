<template>
  <div class="mx-3 mt-2">
    <div
      v-if="processing"
      class="d-flex align-items-center justify-content-center"
      style="height: 65vh"
    >
      <Spinner />
    </div>
    <div v-else class="content-area">
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
          <span v-if="props.column.field == 'username'">
            <span>{{ props.row.username }}</span> </span
          ><span v-if="props.column.field == 'email'">
            <span>{{ props.row.email }}</span> </span
          ><span v-if="props.column.field == 'country'">
            <span>{{ props.row.country }}</span> </span
          ><span v-if="props.column.field == 'gender'">
            <span>{{ props.row.gender }}</span>
          </span>
          <span v-if="props.column.field == 'dataset_count'">
            <span>{{ props.row.dataset_count }}</span
            ><b-icon
              icon="plus"
              variant="success"
              class="dataset-icon"
              style="float: right; font-weight: bold; font-size: 1.3rem"
              v-b-modal.modal-center
              @click="
                (currentDatasets = props.row.datasets),
                  (currentUser = props.row.id)
              "
            ></b-icon
          ></span>
        </template>
      </vue-good-table>
    </div>

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
        <b-list-group-item v-for="dataset in currentDatasets" :key="dataset.id"
          >{{ dataset.name
          }}<b-icon
            class="delete-dataset"
            variant="danger"
            icon="trash"
            style="float: right"
            @click="handleDeleteFromList($emit, dataset.id)"
          ></b-icon>
        </b-list-group-item>
        <p class="text-info mt-2 mb-0">Select dataset to add</p>
        <b-form-select
          v-model="selected"
          :options="options"
          class="mb-3"
          value-field="id"
          text-field="name"
          disabled-field="notEnabled"
          aria-placeholder="Select dataset to add"
        ></b-form-select>
      </b-list-group>
      <template #modal-footer="{ cancel }" class="mx-auto">
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
import axios from "../../store/axios_setup";
// import rows from "@/services/users";

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
          field: "username",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Country",
          field: "country",
        },
        {
          label: "Gender",
          field: "gender",
        },
        {
          label: "Datasets",
          field: "dataset_count",
        },
      ],
      rows: [],
      options: ["dataset1", "dataset2"],
      deletingSelected: false,
      selected: "",
      currentDatasets: [],
      currentUser: "",
      currentUserName: "",
      processing: true,
      selectedSite: "",
    };
  },
  methods: {
     handleDeleteFromList(e, selected) {
      e.preventDefault;
      this.$store.commit("isLoading", true);
      console.log(selected);
      console.log("Current user", this.currentUser);
      axios
        .delete(`/admin/users/${this.currentUser}/assignments/${selected}/`)
        .then(async () => {
          await this.$router.go(0);
          this.$store.commit("isLoading", false);
        });
    },
    handleDatasetUpdate(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      // console.log(this.selected);
      // console.log("CUrrent user", this.currentUser);
      axios
        .post(`/admin/users/${this.currentUser}/assignments/`, {
          dataset_id: this.selected,
        })
        .then(async () => {
          await this.$router.go(0);
          this.$store.commit("isLoading", false);
        });
    },
  },
  created() {
    axios.get(`/admin/users/`).then((res) => {
      console.log(res);
      this.rows = res.data.filter((x) => x.project_id == 1);
      this.processing = false;
    });
    axios.get(`/admin/datasets/`).then((res) => {
      console.log(res);
      this.options = res.data.filter((x) => x.project_id == 1);
    });
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
.content-area {
  height: 90vh;
  overflow-y: auto;
  padding-bottom: 5rem;
}
</style>
