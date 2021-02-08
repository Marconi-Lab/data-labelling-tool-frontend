<template>
  <div>
    <main>
      <section class="main-body">
        <div class="form-card">
          <form>
            <div class="text-center">
              <p class="text-info">Administrator</p>
            </div>
            <div class="form-group">
              <input
                placeholder="Email"
                name="email"
                class="form-control item field"
                type="email"
                id="email"
                v-type="email"
              />
            </div>
            <div class="form-group">
              <input
                placeholder="password"
                class="form-control item field"
                name="password"
                type="password"
                id="password"
                v-type="email"
              />
            </div>
            <small class="text-danger" v-if="store_auth" id="msg"
              >Wrong password or email</small
            >
            <div class="buttons">
              <div class="login">
                <button
                  class="btn btn-info login"
                  type="submit"
                  @click="handleLogin"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
$colors: (
  primary: #09a2ff,
  green: #1fb56f,
  text: #707070,
);
@function color($thecolor) {
  @return map-get($colors, $thecolor);
}
$radius: 20px;
$padding: 15px;
.text-info {
  padding-bottom: $padding;
  font-size: 20px;
}
.main-body {
  padding-top: 20vh;
  p {
    text-align: center;
    padding-top: 30px;
    color: color(text);
  }
}
.field {
  border-radius: 10px;
}
.form-card {
  max-width: 300px;
  height: auto;
  max-height: 400px;
  margin: auto;
  // margin-top: 20vh;
  padding: $padding;
  box-shadow: 2px 5px 10px gray;
  border-radius: $radius;
  padding-bottom: 10px;
}
.btn {
  text-align: center;
  width: 200px;
  font-size: 15px;
  border-radius: $radius;
  margin-bottom: 30px;
}
.buttons {
  text-align: center;
  padding-top: $padding;
}
.btn-primary {
  background-color: color(primary);
  border: 0px;
}
.btn-success {
  background-color: color(green);
  border: 0px;
}
/* .login:hover {
  text-decoration: none;
}
#msg {
  color: red;
  font-size: 14px;
} */
</style>
