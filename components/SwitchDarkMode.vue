<template lang='pug'>
.container(:class='darkMode ? "dark" : "light" ')
  .theme-switcher(:class='darkMode ? "dark" : "light" ')
      el-switch.theme-switch(
        style='display: block',
        v-model='darkModeState',
        active-color='#FF7575',
        active-icon-class='far fa-moon',
        inactive-icon-class='far fa-sun',
        inactive-color='#0460F5',
        @change='toggleDarkMode' )
</template>

<script>
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      darkModeState: false
    }
  },
  computed: { ...mapGetters(['darkMode']) },
  mounted() {
    this.darkModeState = this.darkMode
  },
  beforeCreate() {
    var cookie = null

    if (!process.server) {
      cookie = Cookie.get()
      try {
        var darkModeCookie = JSON.parse(cookie.darkMode)
        this.$store.dispatch('setDarkMode', darkModeCookie)
      } catch (err) {
        // No valid cookie found
      }
    }
  },
  methods: {
    toggleDarkMode(payload) {
      this.$store.dispatch('setDarkMode', payload)
      this.$bus.$emit('toggleDarkMode', payload)
      Cookie.set('darkMode', payload)
    }
  }
}
</script>

<style lang='sass' scoped>
.container
  width: 100%
  z-index: 100
  position: fixed
  top: 0em
  left: 0em

.theme-switcher
  position: relative
  float: right
  background: none

.theme-switcher.light /deep/
  i
    color: $color-text 

.theme-switcher.dark /deep/
  i
    color: $color-text-dark
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px)
  .container.light, .container.dark
    opacity: 0.8
  .container.light
    background-color: $color-bg-2
  .container.dark
    background-color: $color-bg-dark-2
  .theme-switcher
    padding: 0.5em

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px)
  .container.light, .container.dark
    opacity: 0.8
  .container.light
    background-color: $color-bg-2
  .container.dark
    background-color: $color-bg-dark-2
  .theme-switcher
    padding: 0.5em
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px)
  .container.light, .container.dark
    opacity: 1
    background: none
  .theme-switcher
    padding: 2em
// /* Extra large devices (large laptops and desktops, 1200px and up) */
// @media only screen and (min-width: 1200px)
</style>
