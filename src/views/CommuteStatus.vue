<template>
  <div v-on:click="onClickAction" class="commutestatus container">
    <Nav />
    <div class="row">
      <div class="col">
        <b-alert :show="this.hasCommuteStatusErrored" variant="danger">{{
          $t("status.error")
        }}</b-alert>
      </div>
    </div>
    <Status
      v-if="!this.hasCommuteStatusErrored"
      :commute-status="workStatuses(workIndex)"
      :to="user.user.workStation"
    />
    <Status
      v-if="!this.hasCommuteStatusErrored"
      :commute-status="homeStatuses(homeIndex)"
      :to="user.user.homeStation"
    />
  </div>
</template>

<script>
import Nav from "../components/Nav";
import Status from "../components/Status";
import { mapGetters, mapState } from "vuex";

export default {
  name: "CommuteStatus",
  components: {
    Nav,
    Status
  },
  data() {
    return {
      workIndex: 0,
      homeIndex: 0
    };
  },
  methods: {
    getCommuteStatus() {
      this.$store.dispatch("fetchCommuteStatuses");
    },
    getUser() {
      this.$store.dispatch("fetchUser");
    },
    getStations() {
      this.$store.dispatch("fetchStations");
    },
    getNumberOfHomeStatuses() {
      return this.$store.getters.getNumberOfHomeStatuses;
    },
    getNumberOfWorkStatuses() {
      return this.$store.getters.getNumberOfWorkStatuses;
    },
    onClickAction() {
      this.homeIndex++;
      if (this.homeIndex >= this.getNumberOfHomeStatuses) {
        this.homeIndex = 0;
      }

      this.workIndex++;
      if (this.workIndex >= this.getNumberOfWorkStatuses) {
        this.workIndex = 0;
      }
    }
  },
  created() {
    this.getCommuteStatus();
    this.getUser();
    this.getStations();
  },
  computed: {
    workStatuses() {
      return this.$store.getters.getToWork;
    },
    homeStatuses() {
      return this.$store.getters.getToHome;
    },
    hasCommuteStatusErrored() {
      return this.$store.getters.hasCommuteStatusErrored;
    },
    ...mapState(["user"]),
    ...mapGetters([
      "getNumberOfWorkStatuses",
      "getNumberOfHomeStatuses"
      // ...
    ])
  }
};
</script>

<style scoped lang="scss"></style>
