<template lang='pug'>
.sidebar(style='position: fixed; top: 0; bottom: 0; height: 100vh;', :style="[setHorizontal, { 'width': maxWidth, 'transform': translateWidth }]")
  slot(v-if='visible')
</template>

<script>
// Props
// Data
// Methods
// Watch
/**
 * @module components/Sidebar
 * @desc	Reusable sidebar component to showcase content
 * @vue-prop {Boolean} [value=false] - Value watched by `toggle`
 * @vue-prop {Boolean} [hideOnEsc=true] - Hide sidebar on pressing keyboard Esc
 * @vue-prop {Boolean} [hideOnClickOutside=true] - Hide sidebar on clicking outside the sidebar
 * @vue-prop {string} [sidebarId=v-sidebar] - Unique HTML id for the sidebar.
 * @vue-prop {String} [align=left] - Left or Right aligned
 * @vue-prop {Number} [width=270] - Width of the sidebar
 * @vue-prop {String} [units=px] - px or percent
 * @vue-prop {Boolean} [push=false] - Push or overlay effect
 * @vue-prop {Number} [duration=0.2] - Transition duration in seconds
 * @vue-prop {String} [effect=linear] - Transition effect
 * @vue-data {Boolean} [visible=false] - Show sidebar
 * @vue-computed {String} setHorizontal - Computes sidebar alignment object
 * @vue-computed {String} maxWidth - Computes width of the sidebar along with units
 * @vue-computed {String} translateWidth - Computes translate transformation for the sidebar
 */
export default {
  props: {
    value: { type: Boolean, default: false },
    hideOnEsc: { type: Boolean, default: true },
    hideOnClickOutside: { type: Boolean, default: true },
    sidebarId: { type: String, default: 'v-sidebar' },
    align: { type: String, default: 'left' },
    width: { type: Number, default: 270 },
    units: { type: String, default: 'px' },
    push: { type: Boolean, default: false },
    duration: { type: Number, default: 0.2 },
    effect: { type: String, default: 'linear' }
  },
  data() {
    return { visible: false }
  },
  computed: {
    setHorizontal() {
      return this.align === 'right' ? { right: 0 } : { left: 0 }
    },
    maxWidth() {
      var units = this.units === 'percent' ? '%' : 'px'
      return this.width + units
    },
    translateWidth() {
      if (this.units === 'px') {
        return this.align === 'right'
          ? 'translateX(' + this.width + 'px )'
          : 'translateX(-' + this.width + 'px )'
      } else if (this.units === 'percent') {
        return this.align === 'right'
          ? 'translateX(100' + '% )'
          : 'translateX(-100' + '% )'
      }
    }
  },
  watch: {
    /**
     * Watcher: Value
     * @event value
     * @property val
     */
    value(val) {
      setTimeout(() => this.toggle(val))
    }
  },
  methods: {
    /**
     * - Adds timingFunction effect to DOM body
     * - Sets up transition style for the `this.sidebarId`
     */
    setupBody() {
      let timingFunction = ''
      switch (this.effect) {
        case 'bounce':
          timingFunction = 'cubic-bezier(0, 1.1, 0.8, 1.1)'
          break
        default:
          timingFunction = this.effect
          break
      }
      document.getElementById(this.sidebarId).style.transition =
        'transform ' + this.duration + 's ' + timingFunction
      if (this.push) {
        document.body.style.transition =
          'transform ' + this.duration + 's ' + timingFunction
      }
    },
    /**
     * Describes the behavior of clicking outside the open sidebar
     * @param {Object} e Event object
     * @fires sidebarWasClosed
     */
    clickOutside(e) {
      if (!this.$el.contains(e.target) && this.visible) {
        this.$emit('sidebarWasClosed', false)
        this.toggle(false)
      }
    },
    /**
     * Describes the behavior of pressing esc key
     * @param {Object} e Event object
     * @fires sidebarWasClosed
     */
    esc(e) {
      if (e.keyCode === 27) {
        this.$emit('sidebarWasClosed', false)
        return this.toggle(false)
      }
    },
    /**
     * Handles sidebar toggle animation
     * @param {Boolean} show Show or hide the sidebar
     */
    toggle(show) {
      var units = this.units === 'percent' ? '%' : 'px'
      if (show) {
        document.body.style.overflow = 'hidden'
        if (this.hideOnClickOutside) {
          document.addEventListener('click', this.clickOutside)
        }
        if (this.hideOnEsc) {
          document.addEventListener('keydown', this.esc)
        }
        if (this.push) {
          document.body.style.transform =
            this.align === 'right'
              ? 'translateX(-' + this.width + units + ')'
              : 'translateX(' + this.width + units + ')'

          if (this.units === 'px') {
            units = 'px'
            // To Test
            document.getElementById(this.sidebarId).style.transform =
              this.align === 'right'
                ? 'translateX(' + this.width + units + ')'
                : 'translateX(-' + this.width + units + ')'
          } else if (this.units === 'percent') {
            units = '%'
          }
        } else
          document.getElementById(this.sidebarId).style.transform =
            this.align === 'right'
              ? 'translateX(-' + 0 + units + ')'
              : 'translateX(' + 0 + units + ')'
        this.setupBody()
        this.visible = true
      } else {
        document.body.style.overflow = 'auto'
        if (this.push) {
          document.body.style.transform = 'translateX(0)'
        } else {
          if (this.units === 'px') {
            units = 'px'
            document.getElementById(this.sidebarId).style.transform =
              this.align === 'right'
                ? 'translateX(' + this.width + units + ')'
                : 'translateX(-' + this.width + units + ')'
          } else if (this.units === 'percent') {
            units = '%'
            document.getElementById(this.sidebarId).style.transform =
              this.align === 'right'
                ? 'translateX(100' + units + ')'
                : 'translateX(-100' + units + ')'
          }
        }

        setTimeout(() => (this.visible = false), this.duration * 500)
      }
    }
  }
}
</script>

<style lang='sass' scoped>
.sidebar
  overflow-y: scroll
</style>
