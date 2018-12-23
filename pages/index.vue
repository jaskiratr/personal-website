<template lang='pug'>
.container
  .landing-container.full-height
    SectionLanding
  el-main
    .sections
      .section-container
        SectionBio
      .section-container
        SectionExperience
      .section-container
        SectionRecognition
      .section-container
        SectionProjects
  .footer-container
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
    SectionFooter
  },
  data() {
    return {
      loading: false
    }
  },
  // computed: { ...mapGetters(['content']) },
  // created() {
  //   this.$store.dispatch('getContent', db.collection('content')).then(() => {
  //     console.log('loaded content', this.content)
  //   })
  // },
  mounted() {
    // console.log('mounted this.owner', this.owner[0])
  }
}
</script>

<style lang='sass'>
body
  background-color: $color-bg

</style>
