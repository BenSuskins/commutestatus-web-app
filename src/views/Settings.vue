<template>
  <div class="settings container">
    <Nav />
    <div class="row">
      <div class="col">
        <b-alert :show="this.hasUserErrored" variant="danger"
          >{{ $t("settings.error") }}
        </b-alert>
      </div>
    </div>
    <div v-if="!this.hasUserErrored">
      <div class="row">
        <div class="col">
          <h2
            v-html="
              $t('settings.header', {
                user: firstName
              })
            "
          ></h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Email address:"
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
              label="First Name:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.firstName"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Last Name:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="form.lastName"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Home Station:"
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
              label="Work Station:"
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
              >{{ $t("settings.updateButton") }}
            </b-button>
            <b-button type="reset" variant="outline-danger"
              >{{ $t("settings.resetButton") }}
            </b-button>
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
        firstName: "",
        lastName: "",
        homeStation: null,
        workStation: null
      },
      show: true
    };
  },
  created() {
    this.getUser();
    this.getStations();
  },
  methods: {
    logoutButtonAction() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      const homeStation = this.stations.stations.find(station => {
        return station.name === this.form.homeStation;
      }).id;
      const workStation = this.stations.stations.find(station => {
        return station.name === this.form.workStation;
      }).id;
      const form = Object.assign({}, this.form);
      form.workStation = workStation;
      form.homeStation = homeStation;
      UserService.putUser(form).then(() => {
        alert("Succcess");
      });
    },
    onReset(evt) {
      evt.preventDefault();

      // Reset our form values
      this.setDefaults();

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    setDefaults() {
      // Reset our form values
      this.form.email = this.email;
      this.form.firstName = this.firstName;
      this.form.lastName = this.lastName;
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
    firstName() {
      return this.user.user.firstName;
    },
    lastName() {
      return this.user.user.lastName;
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
