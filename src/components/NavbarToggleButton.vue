<template>
    <button class="navbar-toggler" type="button"
            data-toggle="collapse"
            :data-target="target"
            :aria-controls="target"
            :aria-expanded="toggled"
            aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
</template>
<script>
export default {
  props: {
    target: {
      type: [String, Number],
      description: 'Button target element'
    },
    toggled: {
      type: Boolean,
      default: false,
      description: 'Whether button is toggled'
    }
  },
  watch: {
    toggled: function (value) {
      const button = document.getElementsByClassName('navbar-brand')
      if (value) {
        button[1].setAttribute('style', 'display: none !important')
      } else {
        button[1].setAttribute('style', 'display: block')
      }
    }
  }
}
</script>
<style>
</style>
