<template>
  <div>
    <div v-if="isLoading" class="row mt-5">
      <div class="col">
        <b-spinner label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!isLoading && this.commuteStatus">
      <div v-if="!this.noTrains">
        <div class="row mb-5">
          <div class="col">
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
            <h2 v-if="!this.isCancelled">
              {{
                $t("status.platform", {
                  platform: platform
                })
              }}
            </h2>
            <h2 v-if="this.isCancelled">
              {{
                $t("status.cancelReason", {
                  cancelReason: cancelReason
                })
              }}
            </h2>
          </div>
        </div>
      </div>
      <div v-if="this.noTrains">
        <div class="row mb-5">
          <div class="col">
            <h1>
              {{
                $t("status.none", {
                  station: to
                })
              }}
            </h1>
          </div>
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
      type: Object
    },
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    setEtdStyle() {
      if (this.commuteStatus) {
        if (this.commuteStatus.estimatedTimeOfDeparture === "On time") {
          this.isOnTime = true;
          this.isDelayed = false;
        } else {
          this.isOnTime = false;
          this.isDelayed = true;
        }
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
    cancelReason() {
      return this.commuteStatus.cancelReason;
    },
    noTrains() {
      if (this.commuteStatus) {
        return false;
      } else {
        return true;
      }
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
