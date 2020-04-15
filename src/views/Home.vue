<template>
  <div class="home container">
    <!-- If not authenticated show log in / sign up-->
    <div v-if="!$auth.isAuthenticated">
      <Welcome />
    </div>
  </div>
</template>

<script>
import Welcome from "../components/Welcome";

export default {
  name: "Home",
  mounted() {
    this.redirectIfLoggedIn();
  },
  components: {
    Welcome
  },
  methods: {
    redirectIfLoggedIn() {
      if (!this.$auth.loading && this.$auth.isAuthenticated) {
        this.$router.push("commutestatus");
      }
    }
  }
};
</script>
