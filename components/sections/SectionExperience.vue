<template lang='pug'>
.container(v-if='content')
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:14, offset:5}')
      el-row(:gutter='40')
        el-col#col-1(:xs='24', :sm='12' :md='12' :lg='6')
          h5.section-title {{content.sectionTitle}}
          h1.section-headline {{content.headline}}
          p.section-subheading {{content.subheading}}
          a(v-if='content.resumeLink', :href='content.resumeLink', target='_blank')
            el-button.v-button Résumé
        el-col#col-2(:xs='24', :sm='12' :md='12' :lg='9').section-content
          div(v-html='content.descriptionLeft')
        el-col#col-3(:xs='24', :sm='12' :md='12' :lg='9').section-content
          div(v-html='content.descriptionRight')
</template>

<script>
/**
 * @module SectionExperience
 * @desc Home page section for author's experience
 * @vue-prop {Object} [content=null] - Section Content
 */

export default {
  props: {
    content: {
      type: Object,
      default: function() {
        return null
      }
    }
  }
}
</script>

<style lang='sass' scoped>
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
