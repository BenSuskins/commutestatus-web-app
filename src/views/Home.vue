<template>
  <div class="home container">
    <!-- If not authenticated show log in / sign up-->
    <div v-if="!$auth.isAuthenticated">
      <Welcome />
    </div>
    <div v-if="$auth.isAuthenticated">
      <b-button @click="clickEvent">Click me</b-button>
    </div>
  </div>
</template>

<script>
import Welcome from "../components/Welcome";

export default {
  name: "Home",
  components: {
    Welcome
  },
  methods: {
    clickEvent() {
      this.$router.push("commutestatus");
    }
  }
};
</script>
