<template>
  <div>
    <b-breadcrumb class="m-0" :items="items"></b-breadcrumb>
    <b-row style="margin: 0px; min-height: 75vh;">
      <b-col md="7">
        <b-row class="mx-auto">
          <div
            class="col-md-6 px-0"
            v-for="image in data.images"
            :key="data.images.indexOf(image)"
          >
            <!-- <b-col md="5"> -->
            <img class="mx-auto" :src="image" alt="data image" />
            <!-- </b-col> -->
          </div>
        </b-row>
      </b-col>

      <b-col md="5" class="forsec">
        <h3>Annotate Data</h3>
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
        { item: "A", name: "Has Ascetic Acid" },
        { item: "B", name: "No Ascetic Acid" },
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

<style>
.col-6 {
  padding: 0px;
}
@media (min-width: 768px) {
  .forsec {
    border-left: 1px solid rgb(191, 191, 191);
    height: 78vh;
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
</style>
