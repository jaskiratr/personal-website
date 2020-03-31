<template lang="pug">
.container
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:12, offset:6}')
      el-row(:gutter='40')
        el-col#col-1(:xs='24', :sm='12' :md='12' :lg='6')
          h5.section-name {{name}}
          h1.section-heading {{heading}}
          p.section-caption {{caption}}
          a(v-if='resumeLink', :href='resumeLink', target='_blank')
            el-button.v-button Résumé
        el-col#col-2(:xs='24', :sm='12' :md='12' :lg='12').section-content
          Content
        //- el-col#col-3(:xs='24', :sm='12' :md='12' :lg='9').section-content
        //-   el-image(src="./images/01.png")
        //-   div(v-html='content.descriptionLeft')
        //-   div(v-html='content.descriptionRight')
</template>

<script>
import fm from '~/content/SectionExperience.md'

export default {
  components: {
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
  }
}
</script>

<style lang="sass" scoped>
.section-subheading
  margin-bottom: 3em

.section-content
  margin-top: 0em

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px)
  .section-subheading
    margin-bottom: 1em
  #col-1
    margin-bottom: 4em
  #col-2, #col-3
    margin-bottom: 2em
</style>
