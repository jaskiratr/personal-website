<template lang="pug">
.container(:class='darkMode ? "dark" : "light" ')
  SwitchDarkMode
  .landing-container.full-height
    SectionLanding
  div.el-main(:class='{ dark: darkMode }')
    .sections
      .section-container
        SectionBio
      .section-container
        SectionCaseStudies
      .section-container
        SectionExperience
      .section-container
        SectionProjects
      .section-container
        SectionRecognition
  .footer-container(:class='{ dark: darkMode }')
    SectionFooter
</template>
<script>
import { mapGetters } from 'vuex'
import SectionLanding from '~/components/sections/SectionLanding'
import SectionBio from '~/components/sections/SectionBio'
import SectionProjects from '~/components/sections/SectionProjects'
import SectionCaseStudies from '~/components/sections/SectionCaseStudies'
import SectionExperience from '~/components/sections/SectionExperience'
import SectionRecognition from '~/components/sections/SectionRecognition'
import SectionFooter from '~/components/sections/SectionFooter'
import SwitchDarkMode from '~/components/SwitchDarkMode'
export default {
  head() {
    return {
      title: 'Portfolio',
      bodyAttrs: { class: this.darkMode ? 'dark' : 'light' },
      htmlAttrs: { class: this.darkMode ? 'dark' : 'light' }
    }
  },
  transition: 'page',
  components: {
    SectionLanding,
    SectionBio,
    SectionProjects,
    SectionCaseStudies,
    SectionExperience,
    SectionRecognition,
    SectionFooter,
    SwitchDarkMode
  },
  computed: {
    ...mapGetters(['darkMode'])
  },
  mounted() {}
}
</script>
<style lang="sass" scoped>
.container
  overflow-x: hidden
</style>
