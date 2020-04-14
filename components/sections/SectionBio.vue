<template lang="pug">
.container
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:12, offset:6}')
      el-row
        el-col(:span='7' style='padding-bottom: 1em')
          h5.section-name {{name}}
          h1.section-heading {{heading}}
          p.section-caption {{caption}}
          a(v-if='resumeLink', :href='resumeLink', target='_blank')
            el-button.v-button Résumé
        el-col.col-description(:span='15' :offset='2')
          Content
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
