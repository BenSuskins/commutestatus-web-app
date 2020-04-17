<template>
  <div>
    <div v-if="isLoading" class="row mt-5">
      <div class="col">
        <b-spinner label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!isLoading">
      <div class="row mb-5">
        <div v-if="numberOfStatuses > 0" class="col">
          <h1>
            {{
              $t("status.to", {
                std: scheduledTimeOfDeparture,
                station: to
              })
            }}
          </h1>
          <h2
            v-bind:class="{
              cancelled: isCancelled,
              'on-time': isOnTime,
              delayed: isDelayed
            }"
          >
            {{ estimatedTimeOfDeparture }}
          </h2>
          <h2>
            {{
              $t("status.platform", {
                platform: platform
              })
            }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      isOnTime: false,
      isDelayed: false
    };
  },
  props: {
    commuteStatus: {
      type: Object,
      required: true
    },
    numberOfStatuses: {
      type: Number,
      required: true
    }
  },
  methods: {
    setEtdStyle() {
      if (this.commuteStatus.estimatedTimeOfDeparture === "On time") {
        this.isOnTime = true;
      } else if (this.commuteStatus.isCancelled) {
        this.isCancelled = true;
      } else {
        this.isDelayed = true;
      }
    }
  },
  updated() {
    this.setEtdStyle();
  },
  computed: {
    isLoading() {
      return this.$store.getters.isCommuteStatusLoading;
    },
    isCancelled() {
      return this.commuteStatus.isCancelled;
    },
    platform() {
      if (this.commuteStatus.platform === "") {
        return this.$i18n.t("status.unknown");
      } else {
        return this.commuteStatus.platform;
      }
    },
    estimatedTimeOfDeparture() {
      return this.commuteStatus.estimatedTimeOfDeparture;
    },
    scheduledTimeOfDeparture() {
      return this.commuteStatus.scheduledTimeOfDeparture;
    },
    to() {
      return this.commuteStatus.to;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "../styles/custom";

.on-time {
  color: $on-time;
}

.delayed {
  color: $delayed;
}

.cancelled {
  color: $cancelled;
}
</style>
