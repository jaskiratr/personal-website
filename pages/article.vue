<template lang="pug">
.container(v-if='showPage' :class='darkMode ? "dark" : "light" ')
  SwitchDarkMode
  div.el-main(:class='{ dark: darkMode }')
    el-row.hero-row(type='flex' align='middle')
      el-col.hero-content(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:12, offset:6}')
        el-button.back-btn(type='text' @click='navigateBack' :class='{ dark: darkMode }') 
          span.mono(style='font-size: 1.33em') ⟵ 
          span.mono Return
        h5.project-role.fade-in.two {{ attributes.role }}
        h5.project-date.fade-in.two {{attributes.date}}
        h1.project-name.fade-in.one(:class='{ dark: darkMode }') {{ attributes.title }}
        p.project-excerpt.fade-in.two {{ attributes.excerpt }}
      el-col(:span='6').hero-image
        image-responsive(:imageURL='attributes.hero' :height="'100%'" alt='performance')
    el-row(type='flex' align='middle').content-row
      el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:12, offset:6}')
        component(v-if='selectedArticle' :is='selectedArticle').fade-in.three
</template>

<script>
import { mapGetters } from 'vuex'
import SwitchDarkMode from '~/components/SwitchDarkMode'

export default {
  head() {
    return {
      title: this.attributes.title,
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
      const markdown = require(`~/content/${query.name}.md`)
      this.attributes = markdown.attributes
      this.selectedArticle = markdown.vue.component
    }
    process.nextTick(() => {
      this.showPage = true
    })
  },
  methods: {
    parseProjectDate(time) {
      const options = { month: 'long' }
      const t = new Date(time)
      const month = new Intl.DateTimeFormat('en-US', options).format(t)
      const year = t.getUTCFullYear()
      return month + '-' + year
    },
    navigateBack() {
      this.$router.go(-1)
      // this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="sass" scoped>
.hero-row
  display: flex
  flex-direction: row
  height: 50vh
  min-height: 550px
  max-height: 1000px
  background: $color-bg-2
.hero-content
  padding: 4em 4em 4em 0em
.hero-image
  height: 100%
  width: 100%
  filter: grayscale(30%)
.project-name
  font-size: 3em
.project-name, .project-role
  color: $color-highlight
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
.dark
  .hero-row
    background: $color-bg-dark-2
  .project-name, .project-role
    color: $color-highlight-dark
@media only screen and (max-width: 600px)
  .hero-row
    flex-direction: column
    height: inherit
  .hero-content
    padding: 2em 1em 0em 1em
  .back-btn
    display: none
  .content-row
    margin-top: 2em
// @media only screen and (min-width: 600px)
// @media only screen and (min-width: 768px)
// @media only screen and (min-width: 992px)
// @media only screen and (min-width: 1200px)
</style>
