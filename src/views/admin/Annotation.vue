<template>
  <div>
    <b-breadcrumb class="m-0" :items="items"></b-breadcrumb>
    <b-row class="justify-content-center">
      <b-col
        class="image-area mx-1"
        md="5"
        v-for="image in data.images"
        :key="image.id"
      >
        <div
          class="mt-3"
          style="border-bottom: solid 1px gray; border-left: solid 1px gray; border-right: solid 1px gray"
        >
          <div class="data">
            <div style="background-color: #17a2b8">
              <div v-if="image.id == imageUpdating">
                <b-icon
                  icon="three-dots"
                  animation="cylon"
                  font-scale="4"
                  variant="warning"
                ></b-icon>
              </div>
              <div v-else>
                <p
                  v-if="image.labelled"
                  class="text-white text-center  pt-3 pb-3 mb-0"
                >
                  Labelled: {{ image.label }}
                </p>
                <p v-else class="text-warning text-center  pt-3 pb-3 mb-0">
                  This image is not labelled
                </p>
              </div>
            </div>
            <img :src="image.image" alt="data image" class="data-image" />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import datasets from "@/services/datasets";
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["currentItem"]),
  },
  methods: {
    ...mapActions(["getUserItem"]),
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
    });
  },
};
</script>

<style>
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
