<template>
  <div>
    <div v-if="annotating" class="m-0 p-0">
      <Annotator :image="selectedImage" />
    </div>
    <b-breadcrumb class="m-0" :items="items"></b-breadcrumb>
    <b-nav>
      <b-nav-item
        active
        style="position: absolute; z-index: 2; right:0; top: 3.3em;"
        class="img-upload"
        ><b-btn class="custom-button" variant="info" v-b-modal.modal-images>
          upload images
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
    <div class="main-content" v-else>
      <FolderPaginate
        :labelled="currentItem.labelled"
        :name="currentItem.name"
        :label="currentItem.label"
        :itemid="currentItem.id"
      />
      <hr
        style="border-top: solid 0.1rem #007fff; width: 100vw; margin-top: 0px;"
      />
      <!-- <h5 v-if="data.labelled" class="text-info">
          This folder is labelled {{ data.label }}.
        </h5>
        <h5 v-else class="text-danger">This folder is not labelled!</h5>
        <hr style="width: 100vw" />
      </div> -->
      <h5 v-if="!currentItem.images.length" class="text-danger pt-5">
        This folder is empty, upload images.
      </h5>

      <b-row class="justify-content-center content-area" v-else>
        <b-col
          class="image-area mx-1"
          md="4"
          sm="6"
          style="max-width: 300px"
          v-for="image in data.images"
          :key="image.id"
        >
          <div
            class="mt-3"
            
          >
            <div class="data">
              <div style="background-color: #007fff; border-top-left-radius: 0.4rem; border-top-right-radius: 0.4rem;">
                <div>
                  <p
                    v-if="image.labelled"
                    class="text-white text-center  py-1 mb-0"
                  >
                    Labelled: {{ image.label }}
                  </p>
                  <p v-else class="text-warning text-center  py-1 mb-0">
                    This image is not labelled
                  </p>
                </div>
              </div>
              <img
                @click="handleImageClick(image)"
                v-lazy="image.image"
                alt="data image"
                style="border-bottom: solid 1px gray; border-left: solid 1px gray; border-right: solid 1px gray"
                class="data-image"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="comment-section m-4">
        <b-alert v-if="text" show variant="info" class="mx-4">
          <h5>Comment</h5>
          <hr
            style="border-top: solid 0.1rem #007fff; width: 100%; margin-top: 0px;"
          />
          <p class="text-left">{{ text }}</p>
        </b-alert>
        <b-alert v-else show variant="danger" class="mx-4">
          <h5>Comment</h5>
          <hr
            style="border-top: solid 0.1rem maroon; width: 100%; margin-top: 0px;"
          />
          <p class="text-left">No comment!</p>
        </b-alert>
      </div>
    </div>

    <!-- modal -->
    <b-modal
      id="modal-images"
      centered
      title="Upload Images"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <b-form-file
        v-model="files"
        ref="files"
        id="files"
        :state="Boolean(images)"
        placeholder="Choose a file or drop it here..."
        multiple
        accept="image/jpeg, image/png"
        :file-name-formatter="formatNames"
        v-on:change="handleFileChange()"
      ></b-form-file>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button size="sm" variant="outline-info" @click="handleImagesUpload"
          >Submit</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable */
import datasets from "@/services/datasets";
import Annotator from "@/components/admin/annotator.vue";
import FolderPaginate from "@/components/folderPaginate";

import { mapActions, mapGetters } from "vuex";
import axios from "../../store/axios_setup";
export default {
  name: "annotations",
  components: {
    Annotator,
    FolderPaginate,
  },
  data() {
    return {
      datasets,
      files: [],
      items: [
        {
          text: "datasets",
          href: "/admin/datasets",
          active: false,
        },
        {
          text: this.$route.params.dataset,
          href: "",
          active: false,
        },
        {
          text: "",
          href: "",
          active: true,
        },
      ],
      selected: "A",
      text: "",
      data: {},
      options: [],
      options2: [],
      images: [],
      processing: true,
    };
  },
  computed: {
    ...mapGetters(["currentItem", "annotating"]),
  },
  watch: {
    $route(to, from) {
      this.data = this.currentItem;
      this.$store.commit("imageGroup", this.currentItem.images);
      this.items[1].href = `/admin/datasets/${this.currentItem.dataset_id}`;
      this.items[2].text = this.currentItem.name;
      this.text = this.currentItem.comment;
    },
  },
  methods: {
    ...mapActions(["getUserItem"]),
    handleFileChange() {
      // this.files = this.$refs.files.files;
    },
    handleImageClick(image) {
      this.$store.commit("annotating", true);
      this.selectedImage = image;
    },
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    handleImagesUpload(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      console.log(this.files);
      console.log("Files", this.files);
      var formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let image = this.files[i];
        formData.append("images", image);
      }

      axios
        .post(`/admin/item/${this.$route.params.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          console.log("Upload response ", res.data);
          await this.$router.go(0);
          this.$store.commit("isLoading", false);
        });
    },
  },
  created() {
    this.getUserItem(this.$route.params.id).then(() => {
      console.log("data", this.currentItem);
      //populating breadcrumb items
      this.items[1].href = `/admin/datasets/${this.currentItem.dataset_id}`;
      this.items[2].text = this.currentItem.name;
      this.data = this.currentItem;

      var str = "ABCD";
      //Populating images label options array
      for (var i in this.currentItem.image_classes) {
        this.options.push({
          item: str[i],
          name: [this.currentItem.image_classes[i]],
        });
      }
      //Populating folder label options array
      for (var j in this.currentItem.dataset_classes) {
        this.options2.push({
          item: str[j],
          name: [this.currentItem.dataset_classes[j]],
        });
      }
      // populating selector with existing label
      if (this.data.labelled) {
        this.selected2 = this.options2.filter(
          (x) => x.name[0].toLowerCase() == this.data.label.toLowerCase()
        )[0].item;

        // populating comment
        this.text = this.currentItem.comment;
      }
      this.processing = false;
    });
  },
};
</script>

<style scoped>
.card-custom {
  border-radius: 1rem;
}
.comment-section {
  font-size: 0.8rem;
}
.col-6 {
  padding: 0px;
}
.data-image {
  width: 100%;
  height: auto;
  padding: 0px;
  background-image: url("../../assets/loading.gif");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}
.image-area {
  max-width: 200px;
}
@media (min-width: 768px) {
  .forsec {
    border-left: 1px solid rgb(191, 191, 191);
    height: 83vh;
    padding: 20px;
  }
  .forsec .container {
    padding: 20px;
  }
  img {
    width: 26vw;
    height: 16rem;
    padding: 1rem;
    object-fit: cover;
  }
}
@media (max-width: 768px) {
  .forsec {
    border-top: 1px solid rgb(191, 191, 191);
    height: 78vh;
  }
  .forsec {
    padding-top: 10px;
  }
  .forsec .container {
    padding: 10px;
  }
  img {
    width: 20rem;
    height: 20rem;
    object-fit: cover;
    padding: 1em;
  }
}
@media (max-width: 460px) {
  .main-content {
    margin-top: 3rem;
  }
  .img-upload {
    top: 10em;
    left: 0px;
  }
  .custom-button {
    position: absolute;
    top: 3.7em;
    left: 1rem;
  }
  .forsec {
    border-top: 1px solid rgb(191, 191, 191);
    height: 78vh;
  }
  .forsec {
    padding-top: 10px;
  }
  .forsec .container {
    padding: 10px;
  }
  img {
    width: 20rem;
    height: 20rem;
    object-fit: cover;
    padding: 1em;
  }
}
.content-area {
  height: 85vh;
  overflow-y: auto;
  padding-bottom: 5rem;
}
</style>
