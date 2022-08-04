<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="6"
      style="width: 100%; height: 400px"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false,
      }"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :clickable="true"
        :draggable="true"
        :position="m.position"
        @click="center = m.position"
        :label="m.name"
      >
      </GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",

  data() {
    return {
      // default to montreal to keep it simple
      // change this to whatever makes snse
      center: { lat: 0.3415393150983366, lng: 32.57792158650587 },
      markers: [
        {
          position: { lat: 0.3415393150983366, lng: 32.57792158650587 },
          name: "UCI",
        },
        {
          position: { lat: -0.607401244183883, lng: 30.654472509984654 },
          name: "Mbarara",
        },
        {
          position: { lat: 3.030603061053452, lng: 30.908238598501104 },
          name: "Arua",
        },
        {
          position: { lat: 0.4563726816785675, lng: 33.48021542748195 },
          name: "Mayuge",
        },
        {
          position: { lat: 0.44463512155574136, lng: 33.21681251925803 },
          name: "Jinja",
        },
      ],
      places: ["UCI"],
      currentPlace: null,
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // setPlace(place) {
    //   this.currentPlace = place;
    // },
    // addMarker() {
    //   if (this.currentPlace) {
    //     const marker = {
    //       lat: this.currentPlace.geometry.location.lat(),
    //       lng: this.currentPlace.geometry.location.lng(),
    //     };
    //     this.markers.push({ position: marker });
    //     this.places.push(this.currentPlace);
    //     this.center = marker;
    //     this.currentPlace = null;
    //   }
    // },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.lnggitude,
        };
      });
    },
  },
};
</script>
