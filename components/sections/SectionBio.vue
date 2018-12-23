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
 * @module sections/SectionBio
 * @desc Section for author's bio
 */
import { db } from '@/services/firebase-init.js'

export default {
  data() {
    return {
      content: null
    }
  },
  firestore: {
    content: db.collection('content').doc('sectionBio')
  }
}
</script>

<style lang='sass' scoped>
.col-description
  padding-bottom: 1.5em
</style>
