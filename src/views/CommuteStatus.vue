<template>
  <div class="commutestatus container">
    <Nav />
    <Status />
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
