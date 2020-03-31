<template lang="pug">
.container
  el-row
    el-col(:xs='{span:22, offset:1}', :sm='{span:16, offset:4}', :md='{span:12, offset:6}')
      el-row
        el-col.message(:span='12')
          h1 {{heading}}
        el-col(:span='12')
          Content
</template>

<script>
/**
 * @module Component-SectionFooter
 * @desc Home page section for home page footer
 * @vue-prop {Object} [content=null] - Section Content
 * @vue-computed {Boolean} darkMode - Dark mode state
 */
import { mapGetters } from 'vuex'
import fm from '~/content/SectionFooter.md'

export default {
  components: {
    Content: {
      extends: fm.vue.component
    }
  },
  data() {
    return {
      heading: fm.attributes.heading
    }
  },
  computed: { ...mapGetters(['darkMode']) }
}
</script>

<style lang="sass" scoped>
.email
  color: $color-highlight
</style>
