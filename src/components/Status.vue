<template>
  <div>
    <div v-if="this.$store.getters.isLoading" class="row">
      <div class="col">
        <b-spinner label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!this.$store.getters.isLoading" class="row">
      <div class="col">
        <h1>To Work</h1>
      </div>
    </div>
    <div v-if="!this.$store.getters.isLoading" class="row">
      <div class="col">
        <h1>To Home</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  created() {
    this.getCommuteStatus();
  },
  methods: {
    getCommuteStatus() {
      this.$store.dispatch("fetchCommuteStatuses");
    }
  },
  components: {},
  props: {}
};
</script>

<style scoped lang="scss"></style>
