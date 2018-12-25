<template lang='pug'>
.container(:class='darkMode ? "dark" : "light" ')
  SwitchDarkMode

  .landing-container.full-height
    SectionLanding
  el-main.el-main(:class='{ dark: darkMode }')
    .sections
      .section-container
        SectionBio
      .section-container
        SectionExperience
      .section-container
        SectionRecognition
      .section-container
        SectionProjects
  .footer-container(:class='{ dark: darkMode }')
    SectionFooter
  //- el-footer
  //-   nav
  //-     ul.nav-list
  //-       li.nav-item Github
  //-       li.nav-item Linkedin
  //-       li.nav-item Email
</template>

<script>
/**
 * @module pages/index
 * @desc Home page
 */
import SectionLanding from '~/components/sections/SectionLanding'
import SectionBio from '~/components/sections/SectionBio'
import SectionExperience from '~/components/sections/SectionExperience'
import SectionRecognition from '~/components/sections/SectionRecognition'
import SectionProjects from '~/components/sections/SectionProjects'
import SectionFooter from '~/components/sections/SectionFooter'
import SwitchDarkMode from '~/components/SwitchDarkMode'
import { mapGetters } from 'vuex'

export default {
  /**
   * - SectionLanding
   * - SectionBio
   * - SectionExperience
   * - SectionRecognition
   * - SectionProjects
   */
  components: {
    SectionLanding,
    SectionBio,
    SectionExperience,
    SectionRecognition,
    SectionProjects,
    SectionFooter,
    SwitchDarkMode
  },
  data() {
    return {
      loading: false
    }
  },
  computed: { ...mapGetters(['darkMode']) },
  mounted() {
    // this.darkModeState = this.darkMode
  },
  methods: {
    // toggleDarkMode(payload) {
    //   this.$store.dispatch('toggleDarkMode', payload)
    // }
  }
}
</script>

<style lang='sass'>
body
  .light
    transition: background-color 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s
    background-color: $color-bg
  .dark
    transition: background-color 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s
    color: $color-text-dark
    background-color: $color-bg-dark

.footer-container.dark
  background-color: $color-bg-dark-2

</style>
