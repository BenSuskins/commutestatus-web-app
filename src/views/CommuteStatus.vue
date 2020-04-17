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
      class="toWork"
      :commute-status="getWorkStatuses(workIndex)"
      :number-of-statuses="getNumberOfWorkStatuses"
    />
    <Status
      v-if="!this.hasCommuteStatusErrored"
      class="toHome"
      :commute-status="getHomeStatuses(homeIndex)"
      :number-of-statuses="getNumberOfHomeStatuses"
    />
  </div>
</template>

<script>
import Nav from "../components/Nav";
import Status from "../components/Status";

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
  },
  computed: {
    getNumberOfHomeStatuses() {
      return this.$store.getters.getNumberOfHomeStatuses;
    },
    getNumberOfWorkStatuses() {
      return this.$store.getters.getNumberOfWorkStatuses;
    },
    getWorkStatuses() {
      return this.$store.getters.getToWork;
    },
    getHomeStatuses() {
      return this.$store.getters.getToHome;
    },
    hasCommuteStatusErrored() {
      return this.$store.getters.hasCommuteStatusErrored;
    }
  }
};
</script>

<style scoped lang="scss"></style>
