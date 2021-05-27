<template>
  <div>
    <b-breadcrumb class="mb-0" :items="items"></b-breadcrumb>

    <b-nav style="">
      <b-nav-item
        active
        style="position: absolute; z-index: 2222; right: 8rem; top: 3.3em;"
        ><b-btn variant="info" v-b-modal.modal-folder-classes>
          folder classes
          <b-icon icon="plus" style="float: right"></b-icon></b-btn
      ></b-nav-item>
      <b-nav-item
        active
        style="position: absolute; z-index: 2222; right:0; top: 3.3em;"
        ><b-btn variant="info" v-b-modal.modal-folder>
          Add folder
          <b-icon icon="plus" style="float: right"></b-icon></b-btn
      ></b-nav-item>
    </b-nav>
    <div
      v-if="processing"
      class="d-flex align-items-center justify-content-center"
      style="height: 65vh"
    >
      <Spinner />
    </div>
    <div v-else>
      <b-nav class="mb-3">
        <p v-if="classes2.length" class="mt-2 text-info ml-2">
          Image classes: {{ classes2.join(", ") }}
        </p>
        <p v-else class="mt-2 text-danger ml-2">
          Image classes: No image classes added yet
        </p>
        <b-icon
          v-if="!classes2.length"
          icon="pen"
          scale="1"
          class="mt-2 text-info ml-2"
          v-b-modal.modal-imgclass
        ></b-icon>
      </b-nav>
      <hr style="width: 100vw;" />
      <vue-good-table
        v-if="data && data.length"
        :columns="fields"
        :rows="data"
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
              class="text-info"
              :to="`/admin/datasets/${items[1].text}/${props.row.id}`"
              >{{ props.row.name }}</router-link
            >
          </span>
          <span v-if="props.column.field == 'labelled'">
            <b-icon
              v-if="props.row.labelled"
              icon="check-circle-fill"
              scale="2"
              variant="info"
              font-scale="0.5em"
            ></b-icon>
            <b-icon
              v-else
              icon="info-circle-fill"
              scale="2"
              variant="danger"
              font-scale="0.5em"
            ></b-icon>
          </span>
          <span v-if="props.column.field == 'id'">
            <b-icon
              icon="trash"
              variant="danger"
              class="delete-icon"
              style="float: left; font-weight: bold; font-size: 1.3rem;"
              v-b-modal.modal-delete
              @click="folderToDelete = props.row.id"
            ></b-icon>
          </span>
          <span v-if="props.column.field == 'images_URLs'">
            <h5 class="text-info">
              {{ props.row.images_URLs.length }}
            </h5>
          </span>
        </template>
      </vue-good-table>
      <h3 v-else class="text-danger pt-5">
        This dataset is currently empty, add folders.
      </h3>
    </div>

    <!-- modals -->

    <b-modal
      id="modal-delete"
      centered
      title="Delete Dataset"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <h4 class="text-danger">
        You are deleting a folder <b-icon icon="exclamation-circle"></b-icon>
      </h4>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button size="sm" variant="outline-danger" @click="handleFolderDelete"
          >Delete</b-button
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
      <b-form-group label="Folder:" label-cols-sm="2" label-size="sm">
        <b-form-file
          id="file-small"
          v-model="folder"
          size="sm"
          directory
          multiple
          accept="image/jpeg, image/png"
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
      id="modal-folder-classes"
      centered
      title="Update Folder Classes"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <b-form-group label="Folder:" label-cols-sm="2" label-size="sm">
        <b-form-input
          v-model="folderClasses"
          placeholder="Enter classes e.g (Positive, Negative, not sure)"
        ></b-form-input>
      </b-form-group>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button
          size="sm"
          variant="outline-info"
          @click="handleFolderClassUpdate"
          >Update</b-button
        >
      </template>
    </b-modal>

    <b-modal
      id="modal-imgclass"
      centered
      title="Update Image Classes"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <b-form-input
        v-model="imageClasses"
        placeholder="Enter classes e.g (Ascetic Acid, No Ascetic Acid)"
      ></b-form-input>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button size="sm" variant="outline-info" @click="handleClassesUpdate"
          >Submit</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import datasets from "@/services/datasets";
import { VueGoodTable } from "vue-good-table";
import axios from "../../store/axios_setup";
// import { mapGetters } from "vuex";
export default {
  name: "user-data-items",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      items: [
        {
          text: "datasets",
          href: "/admin/datasets",
          active: false,
        },
        {
          text: "",
          href: "",
          active: true,
        },
      ],
      fields: [
        { field: "name", label: "Folder" },
        { field: "labelled", label: "Labelled" },
        { field: "id", label: "Delete" },
        { field: "images_URLs", label: "Folder Count" },
      ],
      folderName: "",
      folder: null,
      folderToDelete: "",
      imageClasses: "",
      folderClasses: "",
      data: [],
      currentPage: 1,
      datasets,
      images: [],
      dataset: {},
      classes2: [],
      processing: true,
      // thisDataset: {},
    };
  },
  computed: {
    rows() {
      return this.data.length;
    },
    // ...mapGetters(["dataset"]),
  },
  methods: {
    // getCurrent() {
    //   // var set = datasets.filter((x) => x._id == this.$route.params.id)[0];
    //   return {
    //     text: this.dataset.name,
    //     active: true,
    //     href: `/user/datasets/${this.dataset.id}`,
    //   };
    // },
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    handleFolderCreate(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      console.log("folder", this.folder);
      this.folderName = this.folder[0].$path.split("/")[0];
      console.log("folder name", this.folderName);
      axios
        .post(`/admin/${this.$route.params.id}/item/`, {
          name: this.folderName,
        })
        .then((res) => {
          console.log("response 1", res);
          var formData = new FormData();
          for (var i = 0; i < this.folder.length; i++) {
            if (this.folder[i].type != "text/xml") {
              let image = this.folder[i];
              formData.append("images", image);
            }
          }
          axios
            .post(`/admin/item/${res.data.id}/`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(async (rs) => {
              console.log("response 2", rs);
              console.log("Upload response ", rs.data);
              await this.$router.go(0);
              this.$store.commit("isLoading", false);
            })
            .catch(async () => {
              await this.$router.go(0);
              this.$store.commit("isLoading", false);
            });
        });
    },
    handleClassesUpdate(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      let classes2 = [];
      for (var i of this.imageClasses.split(",")) {
        classes2.push(i.trim());
      }
      axios
        .put(`/admin/datasets/${this.$route.params.id}/classes2/`, {
          classes2: classes2,
        })
        .then(async () => {
          await this.$router.go(0);
          this.$store.commit("isLoading", false);
        });
    },
    handleFolderClassUpdate(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      let arr = [];
      for (var i of this.folderClasses.split(",")) {
        arr.push(i.trim());
      }
      axios
        .put(`/admin/datasets/${this.$route.params.id}/classes/`, {
          classes: arr,
        })
        .then(async () => {
          await this.$router.go(0);
          this.$store.commit("isLoading", false);
        });
    },
    handleFolderDelete(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      axios.delete(`/admin/item/${this.folderToDelete}/`).then(async () => {
        await this.$router.go(0);
        this.$store.commit("isLoading", false);
      });
    },
  },
  created() {
    const dataset_id = this.$route.params.id;
    console.log("dataset_id", dataset_id);
    // this.$store.dispatch("getDatasetItems", dataset_id);
    axios.get(`/admin/${dataset_id}/item/`).then((res) => {
      console.log(res.data);
      this.data = res.data;
    });

    axios
      .get(`/admin/datasets/${this.$route.params.id}/`)
      .then((res) => {
        // console.log(res.data);
        // console.log(this.dataset);
        this.items[1].text = res.data.name;
        this.items[1].href = `/admin/datasets/${res.data.id}`;
        if (res.data.classes2) {
          this.classes2 = res.data.classes2;
        }
        this.processing = false;
      })
      .catch((err) => {
        console.log(err);
        this.processing = false;
      });
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0px;
}
.text-danger {
  color: red;
}
.text-success {
  color: green;
}
.list-table {
  border: 1px solid rgb(167, 167, 167);
}
</style>
