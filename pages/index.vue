<template lang='pug'>
.container(:class='darkMode ? "dark" : "light" ')
  SwitchDarkMode
  .landing-container.full-height
    SectionLanding(:content='content.sectionLanding')
  div.el-main(:class='{ dark: darkMode }')
    .sections
      .section-container
        SectionBio(:content='content.sectionBio')
      .section-container
        SectionExperience(:content='content.sectionExperience')
      .section-container
        SectionRecognition(:content='content.sectionRecognition')
      .section-container
        SectionProjects(:content='content.sectionProjects', :projects='projects')
  .footer-container(:class='{ dark: darkMode }')
    SectionFooter(:content='content.sectionFooter')
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
  async fetch({ store, params }) {
    await store.dispatch('setContent').then(() => {
      return store.dispatch('setProjects')
    })
  },
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

  computed: {
    ...mapGetters(['darkMode', 'content', 'projects'])
  },
  created() {
    // Workaroud for re-binding
    this.$store.dispatch('setContent')
    this.$store.dispatch('setProjects')
  },
  mounted() {
    // window.onhashchange = onBackKeyDown()
    window.addEventListener('backbutton', onBackKeyDown, false)
    function onBackKeyDown() {
      console.log('BACK')
    }
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
