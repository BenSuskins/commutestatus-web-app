<template>
  <div class="signup container">
    <div class="row">
      <div class="col">
        <b-alert :show="this.hasStationsErrored || this.error" variant="danger"
          >{{ $t("signUp.error") }}
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
    <div v-if="!this.hasStationsErrored">
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
              id="input-group-2"
              :label="$i18n.t('signUp.password')"
              label-for="input-2"
            >
              <b-form-input
                id="input-2 tooltip-target-1"
                v-model="form.password"
                required
                v-b-tooltip.hover.right
                :title="$i18n.t('signUp.passwordHint')"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              :label="$i18n.t('signUp.homeStation')"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="form.homeStation"
                :options="stationDropDowns"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              :label="$i18n.t('signUp.workStation')"
              label-for="input-4"
            >
              <b-form-select
                id="input-4"
                v-model="form.workStation"
                :options="stationDropDowns"
                required
              ></b-form-select>
            </b-form-group>
            <p>
              {{ $t("signUp.tosMessage") }}
              <a
                href="https://www.w3schools.com/howto/howto_js_toggle_password.asp"
                target="_blank"
                >{{ $t("signUp.tos") }}</a
              >
            </p>
            <CommuteStatusButton
              :on-click="onSubmit"
              :button-style="'outline-primary'"
              :button-text="$t('signUp.createButton')"
            />
            <CommuteStatusButton
              :on-click="onReset"
              :button-style="'outline-danger'"
              :button-text="$t('signUp.resetButton')"
            />
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
        homeStation: null,
        workStation: null
      },
      show: true,
      success: false,
      error: false
    };
  },
  methods: {
    backButtonAction() {
      this.$router.push("/");
    },
    onSubmit() {
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

      UserService.postUser(form)
        .then(() => {
          this.onReset();
          return (this.success = true);
        })
        .catch(() => (this.error = true));
    },
    onReset() {
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.homeStation = "";
      this.form.workStation = "";
      this.success = false;
      this.error = false;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getStations() {
      this.$store.dispatch("fetchStations");
    }
  },
  mounted() {
    this.getStations();
  },
  computed: {
    hasStationsErrored() {
      return this.$store.getters.hasStationsErrored;
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
