<template lang="pug">
.container(v-if='content')
  el-row
    el-col(:span='14' :offset='5')
      el-row
        el-col.message(:span='12')
          h1 {{content.sectionTitle}}
        el-col(:span='12')
          div(v-html='content.description')
</template>

<script>
/**
 * @module SectionFooter
 * @desc Section for website Footer page
 */
import { db } from '~/services/firebase-init.js'
export default {
  data() {
    return {
      content: null
    }
  },
  firestore: {
    content: db.collection('content').doc('sectionFooter')
  }
}
</script>

<style lang="sass" scoped>
.email
  color: $color-highlight
</style>
