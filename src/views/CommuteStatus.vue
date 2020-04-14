<template>
  <div class="commutestatus">
    <div class="row">
      <div class="col">
        <Nav />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Status />
      </div>
    </div>
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
  }
};
</script>

<style scoped lang="scss"></style>
