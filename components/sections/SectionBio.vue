<template lang="pug">
.container
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:12, offset:6}')
      el-row
        el-col(:span='7')
          h5.section-name {{name}}
          h1.section-heading {{heading}}
          p.section-caption {{caption}}
          a(v-if='resumeLink', :href='resumeLink', target='_blank')
            el-button.v-button Résumé
        el-col.col-description(:span='15' :offset='2')
          Content
      //- el-row(:gutter='40')
          //- div(v-html='content.descriptionLeft')
        //- el-col.col-description(:xs='24', :sm='12') 
        //-   el-image(src="./images/04.png")
          //- div(v-html='content.descriptionRight')

</template>

<script>
import fm from '~/content/SectionBio.md'

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
.col-description
  margin-top: 3em
</style>
