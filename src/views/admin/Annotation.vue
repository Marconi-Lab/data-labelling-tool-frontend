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
        <h3 class="text-left">Item information</h3>
        <div v-if="item.labelled">
          <table class="table text-left mt-3">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Label
                </td>
                <td>{{ item.label }}</td>
              </tr>
              <tr>
                <td>Labeller</td>
                <td>{{ item.username }}</td>
              </tr>
              <tr v-if="item.label.toLowerCase().includes('not sure')">
                <td>Comment</td>
                <td>{{ item.comment }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <b-icon
            icon="exclamation-circle"
            font-scale="10em"
            class="mt-5"
            variant="danger"
          ></b-icon>
          <p class="mt-5 text-danger">No annotation information yet</p>
        </div>
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
          href: "/admin/datasets",
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
      item: {
        labelled: true,
        username: "wycliff",
        label: "infection",
        comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum, perferendis? Facilis aperiam debitis ab placeat
                  perferendis, sint distinctio tenetur quis aspernatur vitae
                  nihil sequi vero doloremque impedit sit repudiandae autem.`,
      },
    };
  },
  methods: {
    previous() {
      const dataset = datasets.filter(
        (x) => x.name == this.$route.params.dataset
      )[0];
      return {
        text: this.$route.params.dataset,
        href: `/admin/datasets/${dataset._id}`,
        active: false,
      };
    },
    current() {
      return {
        text: "current item",
        href: `/admin/datasets/${this.$route.params.dataset}/${this.$route.params.id}`,
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
</style>
