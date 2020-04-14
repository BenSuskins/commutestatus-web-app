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
      required: false,
      default: "outline-primary"
    },
    buttonSize: {
      type: String,
      required: false,
      default: "md"
    },
    buttonDisabled: {
      type: Boolean,
      required: false,
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
