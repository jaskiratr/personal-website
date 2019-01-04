<template lang='pug'>
.container(v-if='content')
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:14, offset:5}')
      el-row
        el-col(:xs='24', :sm='12', :lg='6')
          h5.section-title {{content.sectionTitle}}
          h1.section-headline {{content.headline}}
          p.section-subheading {{content.subheading}}
      el-row.section-content   
        el-col(:span='24')
          div(v-html='content.description')
</template>

<script>
/**
 * @module SectionRecognition
 * @desc Section for author's reognitions
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