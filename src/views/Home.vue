<template>
  <div class="home container">
    <div class="row">
      <div class="col">
        <h1>{{ $t("welcomeMessage") }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CommuteStatusButton
          :on-click="loginButtonAction"
          :button-text="$t('loginButton')"
          :button-size="'lg'"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <CommuteStatusButton
          :on-click="signupButtonAction"
          :button-text="$t('signupButton')"
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
  name: "Home",
  components: {
    CommuteStatusButton
  },
  methods: {
    loginButtonAction() {
      alert("LOGIN");
    },

    signupButtonAction() {
      alert("signup");
    }
  }
};
</script>
