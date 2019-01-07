<template lang='pug'>
.container(v-if='content')
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:14, offset:5}')
      el-row
        el-col(:span='24')
          h5.section-title {{content.sectionTitle}}
          h1.section-headline {{content.headline}}
      el-row(:gutter='40')
        el-col.col-description(:xs='24', :sm='12')
          div(v-html='content.descriptionLeft')
        el-col.col-description(:xs='24', :sm='12') 
          div(v-html='content.descriptionRight')

</template>

<script>
/**
 * @module Component-SectionBio
 * @desc Home page section for author's bio
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
.col-description
  padding-bottom: 1.5em
</style>
