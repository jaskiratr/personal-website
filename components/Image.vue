<template lang="pug">
  div(v-lazy-container="{ selector: 'img' }" :class="`image-placeholder ${isRounded}`")
    img.image(:data-src="imageRequired"
      :data-loading="imageRequired.placeholder"
      :width="width"
      :height="height"
      :class="classes"
      :alt="alt")
    span.caption(v-if='caption') {{caption}}
    
</template>

<script>
export default {
  props: {
    imageURL: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    caption: {
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
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageRequired() {
      return require(`../assets/images/${this.imageURL}`)
    },
    isRounded() {
      return this.rounded ? 'image-placeholder--rounded' : ''
    }
  }
}
</script>

<style lang="sass" scoped>
.image-placeholder
  overflow: hidden
  line-height: 0
  width: 100%
  height: 100%
  border-radius: 3px

  &--rounded
    border-radius: 100%
.image
  width: 100%
  object-fit: cover
  // height: 100%
span.caption
  line-height: 2rem
  font-size: 0.9rem
  opacity: 0.75
img
  transition: all ease 0.5s
  opacity: 0
  &[lazy='loading']
    opacity: 1
    filter: blur(30px)
  &[lazy='loaded']
    opacity: 1
</style>
