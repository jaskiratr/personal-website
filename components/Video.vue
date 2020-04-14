<template lang="pug">
.player-container(v-if='videoURL')
  client-only
    video.player(
        :controls='controls'
        :autoplay='autoplay')
      source(:src='videoURL')
    
</template>

<script>
export default {
  props: {
    videoURL: {
      type: String,
      default: null
    },
    controls: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    alt: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    },
    classes: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="sass" scoped>
.player-container, .player
  position: relative
  width: 100%
</style>
