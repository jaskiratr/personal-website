<template lang="pug">
.container
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:12, offset:6}')
      el-row(:gutter='40')
        el-col(:xs='24', :sm='12' :md='12' :lg='6'  style='padding-bottom: 4em')
          .section-info
            h5.section-name {{name}}
            h1.section-heading {{heading}}
            p.section-caption {{caption}}
            a(v-if='resumeLink', :href='resumeLink', target='_blank')
              el-button.v-button Résumé
        el-col(:xs='24', :sm='18' :md='18' :lg='18')
          Content
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
  },
  mounted() {
    // if (document) {
    //   // let next
    //   // let prev
    //   // const x = document.getElementsByClassName('col-left')[0]
    //   // prev = next = x
    //   // do {
    //   //   prev = prev.previousSibling
    //   // } while (prev && prev.nodeType !== 1)
    //   // do {
    //   //   next = next.nextSibling
    //   //   console.log('next', next)
    //   // } while (next && next.nodeType !== 1)
    //   const x = document.querySelector('.exp')
    //   console.log('x', x.querySelectorAll('p'))
    // }
  }
}
</script>

<style lang="sass" scoped></style>
