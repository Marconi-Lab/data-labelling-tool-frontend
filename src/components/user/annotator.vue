<template>
  <div class="annotator">
    <b-icon
      @click="handleIconClick"
      icon="x-circle"
      scale="1.5"
      class="annotator-button"
    ></b-icon>
    <div class="row">
      <div class="col-lg-2">
        <b-nav
          vertical
          class="text-left ml-2"
          style="position: fixed; width: 14rem; background: #3f3f3f; height: 93vh;"
        >
          <p class="my-nav-item1 text-white p-2 m-0">Draw Bounding Box</p>
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
            @click="clearBoxes"
            >Clear</b-button
          >
          <b-button
            variant="info"
            style="position: absolute; bottom: 0.5rem; border-radius: 0px; width: 100%;"
            >save</b-button
          >
        </b-nav>
      </div>
      <div class="col-lg-10 image-column pl-2">
        <Box
          v-if="drawingBox.active"
          :b-width="drawingBox.width"
          :b-height="drawingBox.height"
          :b-top="drawingBox.top"
          :b-left="drawingBox.left"
        />
        <img
          :src="imageURL"
          alt="Cervix image"
          class="m-0 p-0"
          @click="handleImageClick"
          @mousemove="changeBox"
          @mouseup="stopDrawingBox"
          @mousedown="startDrawingBox"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Box from "@/components/user/boundingBox.vue";

import { pick } from "lodash";

const getCoursorLeft = (e) => {
  // return e.pageX - 10;
  return e.layerX;
};

const getCoursorTop = (e) => {
  // return e.pageY - 10;
  return e.layerY;
};
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
      initialX: 0,
      initialY: 0,
      boxes: [],
      captureToggle: false,
    };
  },
  methods: {
    clearBoxes() {
      this.drawingBox = {
        active: false,
        top: 0,
        left: 0,
        height: 0,
        width: 0,
      };
    },
    handleIconClick() {
      this.$store.commit("annotating", false);
    },
    handleImageClick(e) {
      console.log(e);
      this.initialX = e.layerX;
      this.initialY = e.layerY;
    },
    startDrawingBox(e) {
      this.captureToggle = true;
      this.drawingBox = {
        width: 0,
        height: 0,
        top: getCoursorTop(e),
        left: getCoursorLeft(e),
        active: true,
      };
    },
    changeBox(e) {
      if (this.drawingBox.active && this.captureToggle) {
        this.drawingBox = {
          ...this.drawingBox,
          width: getCoursorLeft(e) - this.drawingBox.left,
          height: getCoursorTop(e) - this.drawingBox.top,
        };
      }
    },
    stopDrawingBox() {
      this.captureToggle = false;
      if (this.drawingBox.active) {
        if (this.drawingBox.width > 5) {
          this.boxes.push({
            ...pick(this.drawingBox, ["width", "height", "top", "left"]),
          });
        }
      }
    },
  },

  props: {
    imageURL: String,
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
