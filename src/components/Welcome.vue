<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>{{ $t("welcome.welcomeMessage") }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-if="!$auth.loading">
          <CommuteStatusButton
            :on-click="loginButtonAction"
            :button-text="$t('welcome.loginButton')"
            :button-size="'lg'"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CommuteStatusButton
          :on-click="signupButtonAction"
          :button-text="$t('welcome.signupButton')"
          :button-style="'primary'"
          :button-size="'lg'"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CommuteStatusButton from "@/components/CommuteStatusButton.vue";

export default {
  name: "Welcome",
  components: {
    CommuteStatusButton
  },
  props: {},
  methods: {
    loginButtonAction() {
      this.$auth.loginWithRedirect({
        redirect_uri: "http://localhost:3010/commutestatus"
      });
    },
    signupButtonAction() {
      alert("signup");
    }
  }
};
</script>

<style scoped lang="scss"></style>
