<template>
  <div class="settings container">
    <Nav />
    <div class="row">
      <div class="col">
        <h1>This is the settings page</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CommuteStatusButton
          v-if="$auth.isAuthenticated"
          :on-click="logoutButtonAction"
          :button-text="$t('logoutButton')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import CommuteStatusButton from "../components/CommuteStatusButton";

export default {
  name: "Settings",
  components: {
    Nav,
    CommuteStatusButton
  },
  methods: {
    logoutButtonAction() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
