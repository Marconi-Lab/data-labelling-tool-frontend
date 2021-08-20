<template>
  <div class="data">
    <div style="background-color: #007fff; font-size: 0.9rem; border-top-left-radius: 0.4rem; border-top-right-radius: 0.4rem;">
      <div v-if="image.id == imageUpdating">
        <b-icon
          icon="three-dots"
          animation="cylon"
          font-scale="3"
          id="label-icon"
        ></b-icon>
        <p class="ml-2 py-2" style="color: rgba(0,0,0,0)">image</p>
      </div>
      <div v-else>
        <p v-if="image.labelled" class="text-white text-left ml-2 py-2">
          Labelled: {{ image.label }}
        </p>

        <p v-else class="text-warning-custom text-left ml-2 py-2">
          This image is not labelled
        </p>
        <p
          v-if="image.bounding_box"
          class="text-white"
          style="position: absolute; right: 1rem; top: 0.8rem"
        >
          box <b-icon scale="1.2" icon="check" ></b-icon>
        </p>
        <p
          v-else
          class="text-warning-custom"
          style="position: absolute; right: 1rem; top: 0.8rem"
        ><strong>
          box
          <b-icon icon="x-circle" scale="1.2"></b-icon></strong>
        </p>
      </div>
    </div>
    <img
      @click="handleImageClick(image)"
      v-lazy="image.image"
      alt="data image"
      class="data-image"
    />
    <div style="background-color: #007fff; border-bottom-left-radius: 0.4rem; border-bottom-right-radius: 0.4rem;">
      <b-nav-form
        label-size="md"
        label-for="input-sm"
        class="mb-0 mx-2 justify-content-left"
        style="max-width: 500px"
      >
        <b-form-select
          v-model="selected"
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
          style="font-size: 0.9rem; background-color: rgb(252, 252, 143); color: black; border: solid rgb(252, 252, 143) 1px;"
          @click="handleImageUpdate($event, image.id)"
        >
          <p v-if="image.id == imageUpdating" class="m-0">
            ...
          </p>
          <p v-else class="m-0">update</p>
        </b-button>
      </b-nav-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "image-card",
  data() {
    return { selected: "A" };
  },
  computed: {
    ...mapGetters(["imageUpdating"]),
    
  },
  methods: {
    ...mapActions(["labelImage"]),
    handleImageClick(image) {
      this.$store.commit("imageBeingAnnotated", image);
      this.$store.commit("annotating", true);
    },

    handleImageUpdate(e, id) {
      e.preventDefault();

      this.$store.commit("imageUpdating", id);
      const label = this.options.filter((x) => x.item == this.selected)[0]
        .name[0];

      const labeller = JSON.parse(localStorage.getItem("user")).id;
      const imageID = id;

      this.labelImage({ label, labeller, imageID }).then(async () => {
        await this.$store.commit("updateImageLabel", {
          id: imageID,
          label: label,
        });
        this.$store.commit("imageUpdating", null);
      });
    },
  },
  props: {
    image: Object,
    options: Array,
  },
};
</script>

<style>
.text-warning-custom {
  color: rgb(252, 252, 143);
}
.data {
  padding-bottom: 0px;
}
.data-image {
  border: solid #007fff 1px;
  background-image: url("../../assets/loading.gif");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}
#label-icon {
  position: absolute;
  color: rgb(252, 252, 143);
  right: 0;
  animation: mymove 1s infinite;
}

@keyframes mymove {
  50% {
    right: 220px;
  }
}

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
