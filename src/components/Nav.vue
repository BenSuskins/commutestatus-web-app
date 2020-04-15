<template>
  <div id="nav">
    <div class="row">
      <div class="col">
        <router-link to="/commutestatus">Home</router-link> |
        <router-link to="/settings">Settings</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav"
};
</script>

<style scoped lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #8700ff;
    }
  }
}
</style>
