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
                platform: platformString
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
      index: 0,
      isOnTime: false,
      isDelayed: false
    };
  },
  props: {
    scheduledTimeOfDeparture: {
      type: String
    },
    to: {
      type: String
    },
    estimatedTimeOfDeparture: {
      type: String
    },
    platform: {
      type: String
    },
    isCancelled: {
      type: Boolean
    },
    isLoading: {
      type: Boolean
    },
    numberOfStatuses: {
      type: Number,
      required: true
    }
  },
  methods: {
    setEtdStyle() {
      if (this.estimatedTimeOfDeparture === "On time") {
        this.isOnTime = true;
      } else if (this.isCancelled) {
        this.isCancelled = true;
      } else {
        this.isDelayed = true;
      }
    }
  },
  mounted() {
    this.setEtdStyle();
  },
  computed: {
    platformString() {
      if (this.platform === "") {
        return "Unknown";
      } else {
        return this.platform;
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
