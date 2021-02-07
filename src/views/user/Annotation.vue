<template>
  <div>
    <b-breadcrumb class="m-0" :items="items"></b-breadcrumb>
    <b-row style="margin: 0px; min-height: 75vh;">
      <b-col class="image-area" md="7">
        <div
          class="mt-3"
          v-for="image in data.images"
          :key="image.id"
          style="border-bottom: solid 1px gray; border-left: solid 1px gray; border-right: solid 1px gray"
        >
          <div class="data">
            <div style="background-color: #17a2b8">
              <div v-if="true">
                <b-icon
                  icon="three-dots"
                  animation="cylon"
                  font-scale="4"
                  variant="warning"
                ></b-icon>
              </div>
              <div v-else>
                <p v-if="image.labelled" class="text-white text-left ml-5 pt-3">
                  Labelled: {{ image.label }}
                </p>
                <p v-else class="text-warning text-left ml-5 pt-3">
                  This image is not labelled
                </p>
              </div>

              <b-nav-form
                label-size="md"
                label-for="input-sm"
                class="mb-0 ml-5 mr-4 justify-content-left"
                style="max-width: 500px;"
              >
                <b-form-select
                  v-model="selected"
                  :options="options"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                  disabled-field="notEnabled"
                ></b-form-select>
                <b-button
                  class="mb-3 ml-2"
                  type="submit"
                  variant="warning"
                  @click="handleImageUpdate"
                >
                  <p v-if="true" class="m-0">updating ...</p>
                  <p v-else class="m-0">update</p>
                </b-button>
              </b-nav-form>
            </div>
            <img :src="image.image" alt="data image" class="data-image" />
          </div>
        </div>
      </b-col>

      <b-col md="5" class="forsec">
        <h3>Label Folder {{ data.name }}</h3>
        <div class="container">
          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="md"
            label="Label"
            label-for="input-sm"
          >
            <b-form-select
              v-model="selected"
              :options="options2"
              class="mb-3"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            v-if="selected == 'C'"
            label-cols="4"
            label-cols-lg="2"
            label-size="md"
            label="Comment"
            label-for="input-lg"
          >
            <b-form-textarea
              id="textarea"
              v-model="text"
              placeholder="Enter comments..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </div>
        <b-button variant="outline-info" class="update-button">Update</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import datasets from "@/services/datasets";
import { mapActions, mapGetters } from "vuex";
// import axios from "../../store/axios_setup";

export default {
  name: "annotations",
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
      selected: "A",
      text: "",
      data: {},
      options: [],
      options2: [],
    };
  },
  computed: {
    ...mapGetters(["currentItem"]),
  },
  methods: {
    ...mapActions(["getUserItem"]),
    handleImageUpdate(e) {
      e.preventDefault();
    },
  },
  created() {
    this.getUserItem(this.$route.params.id).then(() => {
      console.log("data", this.currentItem);
      this.items[1].href = `/user/datasets/${this.currentItem.dataset_id}`;
      this.items[2].text = this.currentItem.name;
      this.data = this.currentItem;
      var str = "ABCD";
      for (var i in this.currentItem.image_classes) {
        this.options.push({
          item: str[i],
          name: [this.currentItem.image_classes[i]],
        });
      }
      for (var j in this.currentItem.dataset_classes) {
        this.options2.push({
          item: str[j],
          name: [this.currentItem.dataset_classes[j]],
        });
      }
    });
  },
};
</script>

<style scoped>
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
    height: 84vh;
    overflow-y: scroll;
    padding: 20px;
  }
  .image-area {
    height: 83vh;
    overflow: scroll;
  }
  .forsec .container {
    padding: 20px;
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
}
</style>
