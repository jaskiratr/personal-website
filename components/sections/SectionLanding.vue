<template lang="pug">
.container(:class='{ dark: darkMode }')
  el-row.row-banner.center-flex(:class='{ dark: darkMode }')
    el-col.heading-container(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:8, offset:8}')
      div.heading(v-html='heading')

  .animation-container
    client-only
      LandingAnimation.animation
  
  el-row.row-content.center-flex(:class='{ dark: darkMode }')
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:8, offset:8}')
      h5.section-name {{name}}
      h1.section-heading
        Content
      a.resume-link(v-if='resumeLink', :href='resumeLink', target='_blank')
        el-button.cta-link.v-button Résumé
      
</template>
<script>
/**
 * @module Component-SectionLanding
 * @desc Section for home page landing
 * @vue-prop {Object} [content=null] - Section Content
 * @vue-computed {Boolean} darkMode - Dark mode state
 */
import { mapGetters } from 'vuex'
import fm from '~/content/SectionLanding.md'
import LandingAnimation from '~/components/LandingAnimation'

export default {
  components: {
    LandingAnimation,
    Content: {
      extends: fm.vue.component
    }
  },
  data() {
    return {
      name: fm.attributes.name,
      heading: fm.attributes.heading,
      caption: fm.attributes.caption,
      resumeLink: fm.attributes.resumeLink
    }
  },
  computed: { ...mapGetters(['darkMode']) }
}
</script>

<style lang="sass" scoped>
.container
  position: relative
  padding: 0em
  overflow: hidden

.container.dark
  background: $color-bg-dark

.row-banner
  background-color: $color-bg-2
  height: 50vh

.row-banner.dark
  background: $color-bg-dark-2
  .heading
    color: $color-highlight-dark

.row-content
  height: 50vh
  z-index: 10
  // background: none

.center-flex
  min-height: 500px
  display: flex
  justify-content: center
  flex-direction: column

.heading-container
  z-index: 10

.heading
  font-family: 'inter', serif
  color: $color-highlight
  font-size: 3rem
  font-weight: 700
  line-height: 1em
  margin-left: -10px
  -webkit-animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
  -moz-animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
  -ms-animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
  -o-animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
  animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
.section-heading /deep/
  p
    font-size: 3.33rem
    line-height: 3.33rem
    font-weight: 700
    margin-bottom: 0em
.animation-container
  width: 100%
  height: 100%
  position: absolute
  top: 0
  z-index: 1

.cta-link
  margin-top: 2em
@media only screen and (max-width: 600px)
  .row-content
    padding: 20px
    height: 70vh

  .row-banner
    padding: 20px
    height: 30vh

  .row-content.dark
    background: none

  .section-headline
    font-size: 1.2em

  .heading
    margin-left: 0px
    font-size: 2rem

  .center-flex
    min-height: inherit

  .section-heading /deep/
    p
      font-size: 2rem
      line-height: 2rem
      font-weight: 700
  // .animation-container
  //   right: -120%

// @media only screen and (min-width: 600px)
//   .animation-container
//     right: -75%

// @media only screen and (min-width: 768px)
//   .animation-container
//     right: -50%

// @media only screen and (min-width: 992px)
//   .animation-container
//     right: -25%
// @media only screen and (min-width: 1200px)
//   .animation-container
//     right: 0%
</style>
