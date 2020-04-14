<template lang="pug">
.container
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:12, offset:6}')
      el-row
        el-col(:xs='24', :sm='12', :lg='6')
          h5.section-name {{name}}
          h1.section-heading {{heading}}
          p.section-caption {{caption}}
      el-row.section-content   
        el-col(:span='24')
          Content
</template>
<script>
import fm from '~/content/SectionRecognition.md'

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
      caption: fm.attributes.caption
    }
  }
}
</script>
