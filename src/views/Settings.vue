<template>
  <div class="settings container">
    <Nav />
    <div class="row">
      <div class="col">
        <h1
          v-html="
            $t('settings.header', {
              user: user.user.firstName
            })
          "
        ></h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CommuteStatusButton
          v-if="$auth.isAuthenticated"
          :on-click="logoutButtonAction"
          :button-text="$t('settings.logoutButton')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import CommuteStatusButton from "../components/CommuteStatusButton";
import { mapState } from "vuex";

export default {
  name: "Settings",
  components: {
    Nav,
    CommuteStatusButton
  },
  created() {
    this.getUser();
  },
  methods: {
    logoutButtonAction() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    getUser() {
      this.$store.dispatch("fetchUser");
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style scoped lang="scss"></style>
