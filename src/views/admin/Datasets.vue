<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <b-nav>
      <b-nav-item
        active
        style="position: absolute; z-index: 2222; right:0; top: 3.3em;"
        ><b-btn variant="info" class="mr-2" v-b-modal.modal-folder-collection>
          Add folder collection
          <b-icon icon="plus" style="float: right"></b-icon></b-btn
        ><b-btn variant="info" v-b-modal.modal-center>
          Add <b-icon icon="plus" style="float: right"></b-icon></b-btn
      ></b-nav-item>
      <b-nav-item>
      <b-btn variant="info" v-b-modal.modal-folder>
          Add folder<b-icon icon="plus" style="float: right"></b-icon></b-btn
      ></b-nav-item>
    </b-nav>
    <div
      v-if="processing"
      class="d-flex align-items-center justify-content-center"
      style="height: 65vh"
    >
      <Spinner />
    </div>
    <div v-else class="content-area">
      <vue-good-table
        v-if="rows && rows.length"
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
          <span v-if="props.column.label == 'Download'">
            <!-- <span>{{ props.row.download }}</span
          > -->
            <a :href="`http://marconimlannotator/api/v1/download/csv/${props.row.id}/`">
              <b-icon
                icon="download"
                variant="info"
                class="download-icon"
                style="float: left; font-weight: bold; font-size: 1.3rem;"
              ></b-icon
            ></a>
          </span>
          <span v-if="props.column.label == 'Delete'">
            <!-- <span>{{ props.row.download }}</span
          > -->
            <b-icon
              icon="trash"
              variant="danger"
              class="delete-icon"
              style="float: left; font-weight: bold; font-size: 1.3rem;"
              v-b-modal.modal-delete
              @click="selectedDataset = props.row.id"
            ></b-icon>
          </span>
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
        <b-button size="sm" variant="outline-info" @click="handleDatasetCreate"
          >Submit</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-folder-collection"
      centered
      title="Create Folder"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <b-form-group>
        <b-form-input
          v-model="title"
          placeholder="Enter Dataset title"
        ></b-form-input>
        <b-form-input
          v-model="classes"
          placeholder="Enter classes, e.g (Positive, negative, not sure)"
          class="mt-3"
        ></b-form-input>
        <b-form-file
          id="file-small"
          v-model="folder"
          directory
          multiple
          class="mt-3"
        ></b-form-file>
      </b-form-group>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button size="sm" variant="outline-info" @click="handleFolderCreate"
          >Submit</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-folder"
      centered
      title="Create Folder"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <b-form-group>
        <b-form-input
          v-model="title"
          placeholder="Enter Dataset title"
        ></b-form-input>
        <b-form-file
          id="file-small"
          v-model="folder"
          directory
          multiple
          class="mt-3"
        ></b-form-file>
      </b-form-group>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button size="sm" variant="outline-info" @click="handleFolderUpload"
          >Submit</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-delete"
      centered
      title="Delete Dataset"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <h4 class="text-danger">
        You are deleting a dataset <b-icon icon="exclamation-circle"></b-icon>
      </h4>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button
          size="sm"
          variant="outline-danger"
          @click="handleDatasetDelete"
          >Delete</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
// import datasets from "@/services/datasets.js";
import { VueGoodTable } from "vue-good-table";
import { mapActions, mapGetters } from "vuex";
import axios from "../../store/axios_setup";

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
      folder: null,
      columns: [
        { field: "name", label: "Dataset" },
        { field: "progress", label: "Progress" },
        { field: "id", label: "Download" },
        { field: "id", label: "Delete" },
      ],
      rows: [],
      selectedDataset: null,
      processing: true,
    };
  },
  computed: {
    ...mapGetters(["allDatasets"]),
  },
  methods: {
    ...mapActions(["createDataset"]),

    handleDatasetDelete(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      console.log("Delete ID", this.selectedDataset);
      this.$store
        .dispatch("deleteDataset", this.selectedDataset)
        .then(async () => {
          await this.$router.go(0);
          this.$bvModal.hide("modal-delete");
          this.$store.commit("isLoading", false);
        });
    },
    handleDatasetCreate(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      const name = this.title;
      let arr = [];
      for (var i of this.classes.split(",")) {
        arr.push(i.trim());
      }
      this.createDataset({ name: name, classes: arr }).then(async () => {
        await this.$router.go(0);
        this.$bvModal.hide("modal-center");
        this.$store.commit("isLoading", false);
      });
    },
    handleFolderCreate(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      // console.log("folder", this.folder);
      console.log("FOLDER ", this.folder);
      this.$store.commit("isUploading", true);
      let arr = [];
      for (var i of this.classes.split(",")) {
        arr.push(i.trim());
      }

      axios
        .post(`/admin/datasets/`, {
          name: this.title,
          classes: arr,
        })
        .then(async (res) => {
          this.$store.commit("isLoading", false);

          var id = await res.data.id;
          console.log("Response ", res);
          // setting upload maximum value
          await this.$store.commit("uploadMaxValue", this.folder.length);

          for (var i = 0; i < this.folder.length; i++) {
            // create form data
            await this.$store.commit("uploadValue", i + 1);
            var formData = new FormData();
            let image = this.folder[i];
            console.log(this.folder[i].$path.split("/")[1]);
            formData.append("image", image);
            formData.append("dataset_id", id);
            formData.append("folder", this.folder[i].$path.split("/")[1]);
            await axios
              .post(`/admin/datasets/images/`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(async (res) => {
                await console.log("Response 2", res);
                // await this.$router.go(0);
                this.$store.commit("isLoading", false);
              })
              .catch(async () => {
                this.$store.commit("isLoading", false);
              });
          }

          await this.$router.go(0);
        });
    },
    handleFolderUpload(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      console.log("folder", this.folder);
      console.log("FOLDER ", this.folder);
      this.$store.commit("isUploading", true);
      // let arr = [];
      // for (var i of this.classes.split(",")) {
      //   arr.push(i.trim());
      // }

      axios
        .post(`/admin/datasets/`, {
          name: this.title,
          project_id: 1 // need to make this dynamic
        })
        .then(async (res) => {
          this.$store.commit("isLoading", false);

          var id = await res.data.id;
          var project_id = await res.data.project_id
          console.log("Response ", res);
          // setting upload maximum value
          await this.$store.commit("uploadMaxValue", this.folder.length);

          for (var i = 0; i < this.folder.length; i++) {
            // create form data
            await this.$store.commit("uploadValue", i + 1);
            var formData = new FormData();
            let image = this.folder[i];
            console.log(this.folder[i].$path.split("/")[1]);
            formData.append("image", image);
            formData.append("dataset_id", id);
            formData.append("project_id", project_id);
            formData.append("folder", this.folder[i].$path.split("/")[1]);
            await axios
              .post(`/admin/datasets/image/`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(async (res) => {
                await console.log("Response 2", res);
                // await this.$router.go(0);
                this.$store.commit("isLoading", false);
              })
              .catch(async () => {
                this.$store.commit("isLoading", false);
              });
          }

          await this.$router.go(0);
        });
    },
  },
  created() {
    this.$store.dispatch("getAllDatasets").then(() => {
      this.rows = this.allDatasets;
      this.processing = false;
      console.log(this.allDatasets);
    });
  },
};
</script>

<style scoped>
.dataset:hover {
  cursor: "pointer";
  color: teal;
}
.content-area{
  height: 85vh;
  overflow-y: auto;
  padding-bottom: 4rem;
}
</style>
