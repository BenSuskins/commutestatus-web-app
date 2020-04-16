<template>
  <b-button
    class="button"
    @click="onClick"
    :variant="buttonStyle"
    :size="buttonSize"
    :disabled="buttonDisabled"
    >{{ buttonText }}</b-button
  >
</template>

<script>
export default {
  name: "CommuteStatusButton",
  props: {
    buttonText: {
      type: String,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    },
    buttonStyle: {
      type: String,
      default: "outline-primary"
    },
    buttonSize: {
      type: String,
      default: "md"
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  margin: 5px;
}
</style>
