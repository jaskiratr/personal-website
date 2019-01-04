<template lang='pug'>
.container(v-if='content', :class='{ dark: darkMode }')
  el-row.row-banner.center-flex(:class='{ dark: darkMode }')
    el-col.title-container(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:14, offset:5}')
      div.title(v-html='content.bannerTitle')
  
  .animation
    no-ssr
      LandingAnimation
  
  el-row.row-content.center-flex(:class='{ dark: darkMode }')
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:7, offset:5}')
      h5.section-title {{content.sectionTitle}}
      h1.section-headline {{content.headline}}
</template>
<script>
/**
 * @module SectionLanding
 * @desc Section for home page landing
 * @vue-prop {Object} [content=null] - Section Content
 * @vue-computed {Boolean} darkMode - Dark mode state
 */
import LandingAnimation from '~/components/LandingAnimation'
import { mapGetters } from 'vuex'

export default {
  /**
   * - LandingAnimation
   */
  components: { LandingAnimation },
  props: {
    content: {
      type: Object,
      default: function() {
        return null
      }
    }
  },
  computed: { ...mapGetters(['darkMode']) }
}
</script>

<style lang='sass' scoped>
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
  .title
    color: $color-highlight-dark

.row-content
  background: none
  height: 50vh
  z-index: 10

.center-flex
  min-height: 400px
  display: flex
  justify-content: center
  flex-direction: column

.title-container
  z-index: 10

.title
  font-family: 'IBM Plex Serif', serif
  color: $color-title
  font-size: 5em
  font-weight: 100
  line-height: 0.9em
  margin-left: -10px
  -webkit-animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
  -moz-animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
  -ms-animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
  -o-animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)
  animation: fade-up 3s cubic-bezier(0.22, 0.61, 0.36, 1)

.animation
  position: absolute
  top: 0
  z-index: 1

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) 
  .row-banner
    padding: 20px
    height: 60vh
  
  .row-content
    padding: 20px
    background: $color-bg
    height: 40vh

  .row-content.dark
    background: none

  .section-headline
    font-size: 1.2em

  .title
    margin-left: 0px
    font-size: 3em
  
  .center-flex
    min-height: inherit
  
  .animation
    right: -120%

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px)
  .animation
    right: -75%

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px)
  .animation
    right: -50%

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px)
  .animation
    right: -25%
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px)
  .animation
    right: 5%

</style>
