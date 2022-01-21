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
          <span v-if="props.column.field == 'record_count'">
            <span>
              <button
                class="btn btn-secondary btn-sm"
                @click="handleUserAdd(props.row.id)"
              >
                Add to project
              </button></span
            >
          </span>
        </template>
      </vue-good-table>
    </div>
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
          label: "Record",
          field: "record_count",
        },
      ],
      rows: [],
      options: ["dataset1", "dataset2"],
      sites: ["arua", "jinja", "mayuge", "mbarara", "uci", "gynecologist"],
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
    
    handleUserAdd(id) {
      this.$store.commit("isLoading", true);
      axios
        .put(`/admin/users/${id}/project/1`)
        .then(async () => {
          await this.$router.go(0);
          this.$store.commit("isLoading", false);
        });
    },
  },
  created() {
    axios.get(`/admin/users/`).then((res) => {
      console.log(res);
      this.rows = res.data.filter(x=> x.project_id!=1);
      this.processing = false;
    });
    axios.get(`/admin/datasets/`).then((res) => {
      console.log(res);
      this.options = res.data;
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
