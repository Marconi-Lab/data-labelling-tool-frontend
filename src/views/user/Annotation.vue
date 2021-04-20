<template>
  <div>
    <div v-if="annotating" class="m-0 p-0">
      <Annotator :image="selectedImage" />
    </div>
    <b-breadcrumb class="m-0" :items="items"></b-breadcrumb>
    <b-nav>
      <b-nav-item
        active
        style="position: absolute; z-index: 2; right:0; top: 2.3em;"
        class="img-upload"
        ><b-btn class="custom-button" variant="info" v-b-modal.modal-images>
          label folder
          <b-icon icon="pen" scale="0.7" style="float: right"></b-icon></b-btn
      ></b-nav-item>
    </b-nav>
    <div
      v-if="processing"
      class="d-flex align-items-center justify-content-center"
      style="height: 80vh; position: absolute; width: 100vw; z-index: 1111"
    >
      <Spinner />
    </div>
    <div class="main-body" v-else>
      <b-row style="margin: 0px" class="mt-2">
        <b-col class="text-center">
          <h4 v-if="data.labelled" class="text-info">
            {{ data.name }} is labelled {{ data.label }}
          </h4>
          <h4 v-else class="text-danger">{{ data.name }} is not labelled</h4>
        </b-col>
      </b-row>
      <b-row class="px-4 m-0">
        <b-col
          v-for="image in data.images"
          :key="image.id"
          sm="6"
          md="3"
          class="p-1"
        >
          <div class="data">
            <div style="background-color: #17a2b8; font-size: 0.9rem">
              <div v-if="image.id == imageUpdating">
                <b-icon
                  icon="three-dots"
                  animation="cylon"
                  font-scale="3"
                  variant="warning"
                ></b-icon>
              </div>
              <div v-else>
                <p v-if="image.labelled" class="text-white text-left ml-2 py-2">
                  Labelled: {{ image.label }}
                </p>

                <p v-else class="text-warning text-left ml-2 py-2">
                  This image is not labelled
                </p>
                <p
                  v-if="image.bounding_box"
                  class="text-white"
                  style="position: absolute; right: 1rem; top: 0.8rem"
                >
                  box <b-icon scale="1" icon="check"></b-icon>
                </p>
                <p
                  v-else
                  class="text-danger"
                  style="position: absolute; right: 1rem; top: 0.8rem"
                >
                  box
                  <b-icon icon="x-circle" scale="1" variant="danger"></b-icon>
                </p>
              </div>
            </div>
            <img
              @click="handleImageClick(image)"
              :src="image.image"
              alt="data image"
              class="data-image"
            />
            <div style="background-color: #17a2b8">
              <b-nav-form
                label-size="md"
                label-for="input-sm"
                class="mb-0 ml-5 mr-4 justify-content-left"
                style="max-width: 500px"
              >
                <b-form-select
                  @click="imageObject = image"
                  v-model="selectedImageClass"
                  :options="options"
                  class="my-2"
                  value-field="item"
                  text-field="name"
                  disabled-field="notEnabled"
                  style="font-size: 0.9rem"
                ></b-form-select>
                <b-button
                  class="my-2 ml-2"
                  type="submit"
                  style="font-size: 0.9rem"
                  variant="warning"
                  @click="
                    handleImageUpdate($event, image.id, selectedImageClass)
                  "
                >
                  <p v-if="image.id == imageUpdating" class="m-0">
                    ...
                  </p>
                  <p v-else class="m-0">update</p>
                </b-button>
              </b-nav-form>
            </div>
          </div>
        </b-col>
        <hr style="border-top: solid 0.1rem #17a2b8; width: 100vw" />
      </b-row>
    </div>
    <b-modal
      id="modal-images"
      centered
      title="Upload Images"
      header-bg-variant="info"
      header-text-variant="white"
      footer-border-variant="info"
    >
      <div class="mb-5" style="font-size: 0.9rem">
        <b-form>
          <label for="form-label" class="mr-sm-2">Label</label>
          <b-form-select
            id="form-label"
            v-model="selected2"
            :options="options2"
            class="mb-3 mr-2 mt-3"
            style="font-size: 0.9rem"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
          <label for="textarea" class="mr-sm-2">Comment</label>
          <b-form-textarea
            id="textarea"
            v-model="text"
            class="mr-2 mt-3"
            placeholder="(Optional) Enter comments..."
            style="font-size: 0.9rem;"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <!-- <label
            v-if="
              options2
                .filter((x) => x.item == selected2)[0]
                .name[0].toLowerCase() == 'not sure'
            "
            for="textarea"
            class="mr-sm-2"
            >Comment</label
          >
          <b-form-textarea
            id="textarea"
            v-if="
              options2
                .filter((x) => x.item == selected2)[0]
                .name[0].toLowerCase() == 'not sure'
            "
            v-model="text"
            class="mr-2 mt-3"
            placeholder="Enter comments..."
            style="font-size: 0.9rem;"
            rows="3"
            max-rows="6"
          ></b-form-textarea> -->
        </b-form>
      </div>
      <template #modal-footer="{cancel} " class="mx-auto">
        <b-button size="sm" variant="outline-info" @click="cancel()"
          >cancel</b-button
        >
        <b-button size="sm" variant="outline-info" @click="handleFolderLabel"
          >Submit</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import datasets from "@/services/datasets";
import { mapActions, mapGetters } from "vuex";
import Annotator from "@/components/user/annotator.vue";
// import axios from "../../store/axios_setup";

export default {
  name: "annotations",
  components: {
    Annotator,
  },
  data() {
    return {
      datasets,
      items: [
        {
          text: "datasets",
          href: "/user/datasets",
          active: false,
        },
        {
          text: this.$route.params.dataset,
          href: "",
          active: false,
        },
        {
          text: "",
          href: `/user/datasets/${this.$route.params.dataset}/${this.$route.params.id}`,
          active: true,
        },
      ],
      selected: "",
      selected2: "A",
      text: "",
      data: {},
      options: [],
      options2: [],
      processing: true,
      selectedImage: "",
      imageObject: null,
    };
  },
  computed: {
    ...mapGetters(["currentItem", "imageUpdating", "annotating"]),
    currentImage: (id) => id,
    selectedImageClass: {
      get() {
        let value = this.imageObject
          ? this.options.filter(
              (x) => x.name[0].toLowerCase() == this.imageObject.toLowerCase()
            )[0].item
          : "A";
        console.log(value);
        return value;
      },
      set(selectedValue) {
        this.selected = selectedValue;
        return selectedValue;
      },
    },
  },
  methods: {
    ...mapActions(["getUserItem", "labelImage", "labelFolder"]),

    handleImageClick(image) {
      this.$store.commit("annotating", true);
      this.selectedImage = image;
    },

    handleImageUpdate(e, id) {
      e.preventDefault();
      let selected = this.selected ? this.selected : this.selectedImageClass;
      console.log("Selected", this.selectedImageClass);
      this.$store.commit("imageUpdating", id);
      console.log("Selected", selected);
      const label = this.options.filter((x) => x.item == selected)[0].name[0];

      // console.log("label", labels);
      const labeller = JSON.parse(localStorage.getItem("user")).id;
      // console.log("Labeller", labeller);
      const imageID = id;
      // console.log("ImageID ", imageID);

      this.labelImage({ label, labeller, imageID }).then(() => {
        this.getUserItem(this.$route.params.id)
          .then(async () => {
            await this.$router.go(0);
          })
          .then(() => this.$store.commit("imageUpdating", null));
      });
    },

    handleFolderLabel(e) {
      e.preventDefault();
      const label = this.options2.filter((x) => x.item == this.selected2)[0]
        .name[0];
      console.log(label);
      var comment;
      if (!(label.toLowerCase() == "not sure")) {
        comment = "";
      } else {
        comment = this.text;
      }
      const labeller = JSON.parse(localStorage.getItem("user")).id;
      const itemID = this.data.id;

      this.$store.commit("isLoading", true);
      this.labelFolder({ comment, label, labeller, itemID }).then(async () => {
        await this.$router.go(0);
        this.$store.commit("isLoading", false);
      });
    },
  },
  created() {
    this.getUserItem(this.$route.params.id).then(() => {
      console.log("data", this.currentItem);
      //populating breadcrumb items
      this.items[1].href = `/user/datasets/${this.currentItem.dataset_id}`;
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
        this.text = this.data.comment;
      }
      this.processing = false;
    });
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0px;
}
.col-6 {
  padding: 0px;
}
.data-image {
  width: 100%;
  height: auto;
  padding: 0px;
}
@media (min-width: 768px) {
  .forsec {
    border-left: 1px solid rgb(191, 191, 191);
    /* height: 84vh; */
    overflow-y: scroll;
    padding: 20px;
  }
  .image-area {
    /* height: 83vh; */
    /* overflow: scroll; */
  }
  .forsec .container {
    padding: 20px;
  }
}
@media (max-width: 768px) {
  .forsec {
    border-top: 1px solid rgb(191, 191, 191);
    /* height: 78vh; */
  }
  .forsec {
    padding-top: 10px;
  }
  .forsec .container {
    padding: 10px;
  }
}
@media (max-width: 460px) {
  .img-upload {
    left: 0px;
  }
  .custom-button {
    position: absolute;
    left: 1.8rem;
    top: 3.6rem;
  }
  .main-body {
    margin-top: 3rem;
  }
}
</style>
