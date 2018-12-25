<template lang='pug'>
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
.theme-switcher
  position: fixed
  z-index: 100
  top: 2em
  right: 2em

.theme-switcher.light /deep/
  i
    color: $color-text 

.theme-switcher.dark /deep/
  i
    color: $color-text-dark
</style>
