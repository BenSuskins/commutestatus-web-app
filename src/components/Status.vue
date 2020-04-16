<template>
  <div v-on:click="onClickAction">
    <div v-if="this.$store.getters.isLoading" class="row">
      <div class="col">
        <b-spinner label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!this.$store.getters.isLoading">
      <div class="row justify-content-center mb-5">
        <div v-if="this.$store.getters.getToWork.length !== 0" class="col">
          <h1>
            {{
              $t("status.to", {
                std: this.$store.getters.getToWork[this.index]
                  .scheduledTimeOfDepature,
                station: this.$store.getters.getToWork[this.index].to
              })
            }}
          </h1>
          <h2 class="toWorkStatus">
            {{
              this.$store.getters.getToWork[this.index].estimatedTimeOfDepature
            }}
          </h2>
          <h2>
            {{
              $t("status.platform", {
                platform:
                  this.$store.getters.getToWork[this.index].platform === ""
                    ? "Unknown"
                    : this.$store.getters.getToWork[this.index].platform
              })
            }}
          </h2>
        </div>
        <div
          v-if="
            this.$store.getters.getToWork.length === 0 &&
              !this.$store.getters.isLoading
          "
          class="col"
        >
          <h1>
            {{
              $t("status.none", {
                station: this.$store.getters.getUser.workStation
              })
            }}
          </h1>
        </div>
      </div>
      <div class="row justify-content-center mt-5">
        <div v-if="this.$store.getters.getToHome.length !== 0" class="col">
          <h1>
            {{
              $t("status.to", {
                std: this.$store.getters.getToHome[this.index]
                  .scheduledTimeOfDepature,
                station: this.$store.getters.getToHome[this.index].to
              })
            }}
          </h1>
          <h2 class="toHomeStatus">
            {{
              this.$store.getters.getToHome[this.index].estimatedTimeOfDepature
            }}
          </h2>
          <h2>
            {{
              $t("status.platform", {
                platform:
                  this.$store.getters.getToHome[this.index].platform === ""
                    ? "Unknown"
                    : this.$store.getters.getToHome[this.index].platform
              })
            }}
          </h2>
        </div>
        <div
          v-if="
            this.$store.getters.getToHome.length === 0 &&
              !this.$store.getters.isLoading
          "
          class="col"
        >
          <h1>
            {{
              $t("status.none", {
                station: this.$store.getters.getUser.homeStation
              })
            }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  created() {
    this.getCommuteStatus();
    this.getUser();
  },
  data() {
    return {
      index: 0
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
      this.index++;
      if (this.index >= this.$store.getters.getToHome.length) {
        this.index = 0;
      }
    }
  },
  components: {},
  props: {}
};
</script>

<style scoped lang="scss">
@import "../styles/custom";

.toHomeStatus {
  color: $on-time;
}

.toWorkStatus {
  color: $delayed;
}
</style>
