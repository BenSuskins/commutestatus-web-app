<template>
  <div class="settings container">
    <Nav />
    <div class="row">
      <div class="col">
        <b-alert :show="this.hasUserErrored || this.error" variant="danger"
          >{{ $t("settings.error") }}
        </b-alert>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-alert :show="this.success" dismissible variant="success"
          >{{ $t("settings.success") }}
        </b-alert>
      </div>
    </div>
    <div v-if="!this.hasUserErrored">
      <div class="row">
        <div class="col">
          <h2 v-html="$t('settings.header')"></h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              :label="$i18n.t('settings.email')"
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
              id="input-group-4"
              :label="$i18n.t('settings.homeStation')"
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
              :label="$i18n.t('settings.workStation')"
              label-for="input-5"
            >
              <b-form-select
                id="input-5"
                v-model="form.workStation"
                :options="stationDropDowns"
                required
              ></b-form-select>
            </b-form-group>

            <CommuteStatusButton
              :on-click="onSubmit"
              :button-style="'outline-primary'"
              :button-text="$t('settings.updateButton')"
            />
            <CommuteStatusButton
              :on-click="onReset"
              :button-style="'outline-danger'"
              :button-text="$t('settings.resetButton')"
            />
          </b-form>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col">
          <CommuteStatusButton
            v-if="$auth.isAuthenticated"
            :on-click="logoutButtonAction"
            :button-style="'primary'"
            :button-text="$t('settings.logoutButton')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import CommuteStatusButton from "../components/CommuteStatusButton";
import { mapState } from "vuex";
import UserService from "../services/UserService";

export default {
  name: "Settings",
  components: {
    Nav,
    CommuteStatusButton
  },
  data() {
    return {
      form: {
        email: "",
        homeStation: null,
        workStation: null
      },
      show: true,
      success: false,
      error: false
    };
  },
  created() {
    this.setDefaults();
  },
  methods: {
    logoutButtonAction() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
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
      UserService.putUser(form)
        .then(() => (this.success = true))
        .catch(() => (this.error = true));
    },
    onReset() {
      // Reset our form values
      this.setDefaults();
      this.success = false;
      this.error = false;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    setDefaults() {
      // Reset our form values
      this.form.email = this.email;
      this.form.homeStation = this.homeStation;
      this.form.workStation = this.workStation;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getUser() {
      this.$store.dispatch("fetchUser");
    },
    getStations() {
      this.$store.dispatch("fetchStations");
    }
  },
  computed: {
    hasUserErrored() {
      return this.$store.getters.hasUserErrored;
    },
    email() {
      return this.user.user.email;
    },
    homeStation() {
      return this.user.user.homeStation;
    },
    workStation() {
      return this.user.user.workStation;
    },
    stationDropDowns() {
      return Object.assign([], this.stations.stations).map(station => {
        return station.name;
      });
    },
    ...mapState(["user", "stations"])
  }
};
</script>

<style scoped lang="scss"></style>
