<template lang="pug">
.container(v-if='showPage' :class='darkMode ? "dark" : "light" ')
  SwitchDarkMode
  div.el-main(:class='{ dark: darkMode }')
    el-row.hero-row(type='flex' align='middle')
      el-col.hero-content(:span='10' :offset='7')
        el-button.back-btn(type='text' @click='navigateBack' :class='{ dark: darkMode }') 
          span.mono(style='font-size: 1.33em') ⟵ 
          span Return
        h5.project-role.fade-in.one {{ attributes.role }}
        h1.project-name.fade-in.one(:class='{ dark: darkMode }') {{ attributes.title }}
        p.project-excerpt.fade-in.two {{ attributes.excerpt }}
      el-col(:span='6').hero-image
        image-responsive(:imageURL='attributes.hero' :height="'100%'" alt='performance')
    el-row(type='flex' align='middle').content-row
      el-col(:span='10' :offset='7')
        component(v-if='selectedArticle' :is='selectedArticle').fade-up.three
</template>

<script>
import { mapGetters } from 'vuex'
import SwitchDarkMode from '~/components/SwitchDarkMode'

export default {
  // scrollToTop: true,
  head() {
    return {
      bodyAttrs: { class: this.darkMode ? 'dark' : 'light' },
      htmlAttrs: { class: this.darkMode ? 'dark' : 'light' }
    }
  },
  transition: 'page',
  components: { SwitchDarkMode },
  data() {
    return {
      showPage: false,
      attributes: {},
      selectedArticle: null
    }
  },
  computed: {
    ...mapGetters(['darkMode'])
  },
  mounted() {
    const query = this.$route.query
    if (query && query.name) {
      const markdown = require(`~/content/case-studies/${query.name}.md`)
      this.attributes = markdown.attributes
      this.selectedArticle = markdown.vue.component
    }
    process.nextTick(() => {
      this.showPage = true
    })
    // console.log('markdown', markdown)
    // Use Async Components for the benefit of code splitting
    // https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
    // this.selectedArticle = () => import(`~/articles/${this.$route.query.name}.md`).then(({ vue }) => vue.component)
  },
  methods: {
    navigateBack() {
      // this.$router.back()
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.hero-row
  height: 50vh
  min-height: 550px
  max-height: 1000px
  background: $color-bg-2
.dark
  .hero-row
    background: $color-bg-dark-2
.hero-content
  padding: 4em 4em 4em 0em
.hero-image
  height: 100%
  width: 100%
  filter: grayscale(50%)
// .excerpt
//   animation: fadeinmove .5s ease
//   animation-delay: .5s
.project-name
  font-size: 3em
.content-row
  margin-top: 5em
  padding: 20px
.back-btn
  margin-top: 3em
  position: absolute
  top: 0
  z-index: 100
  color: $color-text
.back-btn.dark
  color: $color-text-dark
</style>
