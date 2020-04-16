<template>
  <div v-on:click="onClickAction" class="commutestatus container">
    <Nav />
    <Status
      class="toWork"
      :to="toWork[workIndex].to"
      :estimated-time-of-departure="toWork[workIndex].estimatedTimeOfDeparture"
      :platform="toWork[workIndex].platform"
      :scheduled-time-of-departure="toWork[workIndex].scheduledTimeOfDeparture"
      :is-cancelled="toWork[workIndex].isCancelled"
      :is-loading="isLoading"
      :number-of-statuses="workStatuses"
    />
    <Status
      class="toHome"
      :to="toHome[homeIndex].to"
      :estimated-time-of-departure="toHome[homeIndex].estimatedTimeOfDeparture"
      :platform="toHome[homeIndex].platform"
      :scheduled-time-of-departure="toHome[homeIndex].scheduledTimeOfDeparture"
      :is-cancelled="toHome[homeIndex].isCancelled"
      :is-loading="isLoading"
      :number-of-statuses="homeStatuses"
    />
  </div>
</template>

<script>
import Nav from "../components/Nav";
import Status from "../components/Status";
import { mapState } from "vuex";

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
      if (this.homeIndex >= this.homeStatuses) {
        this.homeIndex = 0;
      }

      this.workIndex++;
      if (this.workIndex >= this.workStatuses) {
        this.workIndex = 0;
      }
    }
  },
  mounted() {
    this.getCommuteStatus();
    this.getUser();
  },
  computed: {
    hasErrored() {
      return this.$store.getters.hasErrored;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    homeStatuses() {
      return this.$store.getters.homeStatuses;
    },
    workStatuses() {
      return this.$store.getters.workStatuses;
    },
    ...mapState(["user", "toWork", "toHome"])
  }
};
</script>

<style scoped lang="scss"></style>
