<template>
  <div class="annotator">
    <b-icon
      @click="handleIconClick"
      icon="x-circle"
      scale="1.5"
      class="annotator-button"
    ></b-icon>
    <div class="row p-0 mt-4">
      <div class="col-lg-3 p-0 ">
        <b-nav
          vertical
          class="text-left ml-5"
          style="position: fixed; width: 14rem; background: #3f3f3f; height: 93vh;"
        >
          <p
            v-if="this.image.bounding_box"
            class="my-nav-item1 text-white p-2 m-0"
          >
            Bounding Box
          </p>
          <p v-else class="text-danger my-nav-item1 p-2 m-0">No bounding Box</p>
          <div class="ml-2 mt-1">
            <b-icon
              icon="square"
              class="m-2 annotation-icon"
              scale="1.5"
            ></b-icon>
          </div>
          <hr class="m-0" style="border-top: 0.1em solid white; width: 100%" />
          <b-button
            variant="info"
            style="border-radius: 0px; width: 100%;"
            disabled
            >Clear</b-button
          >
          <b-button
            variant="info"
            style="position: absolute; bottom: 0.5rem; border-radius: 0px; width: 100%;"
            disabled
            >save</b-button
          >
        </b-nav>
      </div>
      <!-- <div class="col-lg-1 p-0"></div> -->
      <div class="col-lg-8 image-column">
        <Box
          v-if="drawingBox"
          :b-width="drawingBox.width"
          :b-height="drawingBox.height"
          :b-top="drawingBox.top"
          :b-left="drawingBox.left"
        />
        <img
          :src="imageURL"
          alt="Cervix image"
          class="m-0 p-0"
          style="float: left;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Box from "@/components/user/boundingBox.vue";
// import axios from "@/store/axios_setup.js";

export default {
  name: "annotator",
  components: {
    Box,
  },
  data() {
    return {
      drawingBox: {
        active: false,
        top: 0,
        left: 0,
        height: 0,
        width: 0,
      },
      imageURL: "",
      imageID: "",
      // currentImage: {},
    };
  },
  methods: {
    async handleIconClick() {
      // await this.$router.go(0);
      this.$store.commit("annotating", false);
    },
  },
  created() {
    console.log("Image ", this.image);
    this.imageURL = this.image.image;
    this.imageID = this.image.id;
    var box = JSON.parse(this.image.bounding_box);

    if (this.image.bounding_box) {
      this.drawingBox.active = true;
      this.drawingBox.left = box.left;
      this.drawingBox.top = box.top;
      this.drawingBox.width = box.width;
      this.drawingBox.height = box.height;
    } else {
      this.drawingBox = "";
    }
    console.log("Bounding box ", box);
  },
  props: {
    image: Object,
    images: Array,
  },
};
</script>

<style scoped>
.annotator {
  width: 100%;
  height: 100vh;
  z-index: 20;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0px;
}
.annotator-button {
  z-index: 32;
  position: absolute;
  color: white;
  top: 1.5rem;
  right: 1.5rem;
}
.annotator-button:hover {
  cursor: pointer;
}
.row {
  /* position: absolute; */
  padding-top: 2rem;
  z-index: 30;
  height: 100vh;
  width: 100vw;
  overflow: hidden scroll;
}
.image-column {
  overflow-x: scroll;
  overflow-y: scroll;
  padding: 0px;
}
.my-nav-item1 {
  background: #2f2f2f;
  width: 100%;
}
.annotation-icon {
  color: white;
}
.annotation-icon:hover {
  cursor: pointer;
}
img:hover {
  cursor: crosshair;
}
</style>
