<template>
  <div>
    <div v-if="annotating" class="m-0 p-0">
      <Annotator :image="imageBeingAnnotated" />
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
      <FolderPaginate
        :labelled="currentItem.labelled"
        :name="currentItem.name"
        :label="currentItem.label"
        :itemid="currentItem.id"
      />
      <hr
        style="border-top: solid 0.1rem #17a2b8; width: 100vw; margin-top: 0px;"
      />

      <b-row class="px-4 m-0 justify-content-center">
        <b-col
          v-for="image in imageGroup"
          :key="image.id"
          sm="6"
          md="3"
          class="p-1"
        >
          <ImageCard :image="image" :options="options" />
        </b-col>
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
/* eslint-disable */
import datasets from "@/services/datasets";
import { mapActions, mapGetters } from "vuex";
import Annotator from "@/components/user/annotator.vue";
import ImageCard from "@/components/user/imageCard.vue";
import FolderPaginate from "@/components/folderPaginate.vue";
export default {
  name: "annotations",
  components: {
    Annotator,
    ImageCard,
    FolderPaginate,
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
      imageObject: null,
    };
  },
  computed: {
    ...mapGetters([
      "currentItem",
      "annotating",
      "imageGroup",
      "imageBeingAnnotated",
    ]),
    currentImage: (id) => id,
  },
  methods: {
    ...mapActions(["getUserItem", "labelFolder"]),

    handleFolderLabel(e) {
      e.preventDefault();
      const label = this.options2.filter((x) => x.item == this.selected2)[0]
        .name[0];
      console.log(label);
      var comment;
      comment = this.text;

      const labeller = JSON.parse(localStorage.getItem("user")).id;
      const itemID = this.data.id;

      this.$store.commit("isLoading", true);
      this.labelFolder({ comment, label, labeller, itemID }).then(async () => {
        await this.$router.go(0);
        this.$store.commit("isLoading", false);
      });
    },
  },
  watch: {
    $route(to, from) {
      this.data = this.currentItem;
      this.$store.commit("imageGroup", this.currentItem.images);
      this.items[1].href = `/user/datasets/${this.currentItem.dataset_id}`;
      this.items[2].text = this.currentItem.name;
    },
  },
  created() {
    this.getUserItem(this.$route.params.id).then(() => {
      console.log("data", this.currentItem);
      //populating breadcrumb items
      this.items[1].href = `/user/datasets/${this.currentItem.dataset_id}`;
      this.items[2].text = this.currentItem.name;
      this.data = this.currentItem;
      this.$store.commit("imageGroup", this.data.images);

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
