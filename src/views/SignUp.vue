<template>
  <div class="signup container">
    <div class="row">
      <div class="col">
        <b-alert :show="this.hasUserErrored || this.error" variant="danger"
          >{{ $t("signUp.error") }}
        </b-alert>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-alert :show="this.passwordError" variant="danger"
          >{{ $t("signUp.passwordError") }}
        </b-alert>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-alert :show="this.success" dismissible variant="success"
          >{{ $t("signUp.success") }}
        </b-alert>
      </div>
    </div>
    <div v-if="!this.hasUserErrored">
      <div class="row">
        <div class="col">
          <h2 v-html="$t('signUp.header')"></h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              :label="$i18n.t('signUp.email')"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              :label="$i18n.t('signUp.password')"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              :label="$i18n.t('signUp.confirmPassword')"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.confirmPassword"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              :label="$i18n.t('signUp.homeStation')"
              label-for="input-4"
            >
              <b-form-select
                id="input-4"
                v-model="form.homeStation"
                :options="stationDropDowns"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              :label="$i18n.t('signUp.workStation')"
              label-for="input-5"
            >
              <b-form-select
                id="input-5"
                v-model="form.workStation"
                :options="stationDropDowns"
                required
              ></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="outline-primary"
              >{{ $t("signUp.createButton") }}
            </b-button>
            <b-button type="reset" variant="outline-danger"
              >{{ $t("signUp.resetButton") }}
            </b-button>
          </b-form>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col">
          <CommuteStatusButton
            :on-click="backButtonAction"
            :button-style="'primary'"
            :button-text="$t('signUp.back')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService";
import { mapState } from "vuex";
import CommuteStatusButton from "../components/CommuteStatusButton";

export default {
  name: "SignUp",
  components: {
    CommuteStatusButton
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: "",
        homeStation: null,
        workStation: null
      },
      show: true,
      success: false,
      passwordError: false,
      error: false,
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  methods: {
    backButtonAction() {
      this.$router.push("/");
    },
    onSubmit(evt) {
      evt.preventDefault();

      this.passwordError = false;
      this.error = false;

      const homeStation = this.stations.stations.find(station => {
        return station.name === this.form.homeStation;
      }).id;
      const workStation = this.stations.stations.find(station => {
        return station.name === this.form.workStation;
      }).id;
      const form = Object.assign({}, this.form);
      form.workStation = workStation;
      form.homeStation = homeStation;

      if (form.password === form.confirmPassword) {
        UserService.postUser(form)
          .then(() => (this.success = true))
          .catch(() => (this.error = true));
      } else {
        this.passwordError = true;
      }
    },
    onReset(evt) {
      evt.preventDefault();

      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.confirmPassword = "";
      this.form.homeStation = "";
      this.form.workStation = "";
      this.success = false;
      this.error = false;
      this.passwordError = false;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    getStations() {
      this.$store.dispatch("fetchStations");
    }
  },
  mounted() {
    this.getStations();
  },
  computed: {
    hasUserErrored() {
      return this.$store.getters.hasUserErrored;
    },
    stationDropDowns() {
      return Object.assign([], this.stations.stations).map(station => {
        return station.name;
      });
    },
    ...mapState(["stations"])
  }
};
</script>
<style scoped lang="scss">
.signup {
  padding: 30px;
}
</style>
