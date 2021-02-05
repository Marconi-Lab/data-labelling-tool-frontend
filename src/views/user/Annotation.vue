<template>
  <div>
    <b-breadcrumb class="m-0" :items="items"></b-breadcrumb>
    <b-row style="margin: 0px; min-height: 75vh;">
      <b-col class="image-area" md="7">
        <div
          class="mt-3"
          v-for="image in data.images"
          :key="data.images.indexOf(image)"
          style="border-bottom: solid 1px gray; border-left: solid 1px gray; border-right: solid 1px gray"
        >
          <div class="data">
            <div style="background-color: #17a2b8">
              <p v-if="false" class="text-pink text-left ml-5 pt-3">
                Labelled: Ascetic Acid
              </p>
              <p v-else class="text-warning text-left ml-5 pt-3">
                This image is not labelled
              </p>
              <b-form-group
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
              </b-form-group>
            </div>
            <img :src="image" alt="data image" class="data-image" />
          </div>
        </div>
      </b-col>

      <b-col md="5" class="forsec">
        <h3>Label Folder</h3>
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
              :options="options"
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
      ],
      selected: "A",
      text: "",
      data: {},
      options: [
        { item: "A", name: "Positive" },
        { item: "B", name: "Negative" },
        { item: "C", name: "Not Sure" },
      ],
    };
  },
  methods: {
    previous() {
      const dataset = datasets.filter(
        (x) => x.name == this.$route.params.dataset
      )[0];
      return {
        text: this.$route.params.dataset,
        href: `/user/datasets/${dataset._id}`,
        active: false,
      };
    },
    current() {
      return {
        text: "current item",
        href: `/user/datasets/${this.$route.params.dataset}/${this.$route.params.id}`,
        active: true,
      };
    },
  },
  created() {
    console.log(datasets.filter((x) => x.name == this.$route.params.dataset));
    this.items.push(this.previous());
    this.items.push(this.current());
    this.data = datasets
      .filter((x) => x.name == this.$route.params.dataset)[0]
      .items.filter((x) => x._id == parseInt(this.$route.params.id))[0];
    console.log(this.data);
  },
};
</script>

<style scoped>
.col-6 {
  padding: 0px;
}
.data-image {
  width: 90%;
  height: auto;
  border-radius: 10px;
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
