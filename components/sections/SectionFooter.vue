<template lang="pug">
.container(v-if='content')
  el-row
    el-col(:xs='{span:22, offset:1}', :sm='{span:16, offset:4}', :md='{span:14, offset:5}')
      el-row
        el-col.message(:span='12')
          h1 {{content.sectionTitle}}
        el-col(:span='12')
          div(v-html='content.description')
</template>

<script>
/**
 * @module SectionFooter
 * @desc Home page section for home page footer
 * @vue-prop {Object} [content=null] - Section Content
 * @vue-computed {Boolean} darkMode - Dark mode state
 */
import { mapGetters } from 'vuex'

export default {
  props: {
    content: {
      type: Object,
      default: function() {
        return null
      }
    }
  },
  computed: { ...mapGetters(['darkMode']) }
}
</script>

<style lang="sass" scoped>
.email
  color: $color-highlight
</style>
