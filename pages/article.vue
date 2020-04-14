<template lang="pug">
.container(v-if='showPage' :class='darkMode ? "dark" : "light" ')
  SwitchDarkMode
  div.el-main(:class='{ dark: darkMode }')
    el-row.hero-row(type='flex')
      el-col.hero-content(:sm='{span:24}', :md='{span:16}', :lg='{span:16}', :xl='{span:12}')        
          el-row.btn-container
            el-button.back-btn(type='text' @click='navigateBack' :class='{ dark: darkMode }') 
              span.mono Return ↩
          el-row.info-container
            h5.project-role.fade-in.two {{ attributes.role }}
            h5.project-date.fade-in.two {{attributes.date}}
            h1.project-name.fade-in.one(:class='{ dark: darkMode }') {{ attributes.title }}
            p.project-excerpt.fade-in.two {{ attributes.excerpt }}
      el-col.hero-image-col(:sm='{span:24}', :md='{span:16}', :lg='{span:16}', :xl='{span:12}')
        .hero-image
          image-responsive(:imageURL='attributes.hero' :height="'100%'" alt='performance')
    el-row(type='flex' align='middle').content-row
      el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:12, offset:6}', :xl='{span:12, offset:6}')
        .article-content
          component(v-if='selectedArticle' :is='selectedArticle').fade-in.three
    .footer-container(:class='{ dark: darkMode }')
      SectionFooter
</template>

<script>
import { mapGetters } from 'vuex'
import SwitchDarkMode from '~/components/SwitchDarkMode'
import SectionFooter from '~/components/sections/SectionFooter'

export default {
  head() {
    return {
      title: this.attributes.title,
      bodyAttrs: { class: this.darkMode ? 'dark' : 'light' },
      htmlAttrs: { class: this.darkMode ? 'dark' : 'light' }
    }
  },
  transition: 'page',
  components: { SwitchDarkMode, SectionFooter },
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
  background: $color-bg-2
.hero-content
  display: flex
  align-items: flex-end
  flex-flow: column wrap
  flex: 1
  padding: 4em 2em 4em 0em
  .btn-container
    flex: 1
    max-width: 600px
    width: 100%
    padding-left: 20px
    z-index: 100
    .back-btn
      margin-top: 50px
      color: $color-text
    .back-btn.dark
      color: $color-text-dark
  .info-container
    padding: 20px 20px 60px
    max-width: 600px
    display: flex
    flex-direction: column
.hero-image-col
  flex: 1
  filter: grayscale(30%)
  .hero-image
    flex: 1
    height: 100%
    width: 100%
.project-name
  font-size: 3em
.project-name, .project-role
  color: $color-highlight
p.project-excerpt
  padding: 0
  margin: 0
.content-row
  margin: 5em 0em
  padding: 20px
.article-content /deep/
  .md-content .image-placeholder
    margin-bottom: 1rem
.dark
  .hero-row
    background: $color-bg-dark-2
  .project-name, .project-role
    color: $color-highlight-dark
@media only screen and (max-width: 600px)
  .content-row
    margin-top: 1em
  .hero-row
    flex-direction: column
    height: inherit
  .hero-image-col
    height: 250px
    width: 100%
  .hero-content
    padding: 2em 1em 0em 1em
    .info-container
      padding: 0px 0px 40px
  .back-btn
    display: none
// @media only screen and (min-width: 600px)
@media only screen and (min-width: 768px)
  .content-row
    margin-top: 2em
  .hero-content
    padding: 2em 1em 0em 1em
  .article-content /deep/
    .md-content p, h1, h2, h3, ul, li, table
      max-width: 600px
      width: 600px
      margin-left: calc((100% - 600px) / 2)
@media only screen and (min-width: 992px)
  .article-content /deep/
    .md-content p, h1, h2, h3, ul, li, table
      max-width: 650px
      width: 650px
      margin-left: calc((100% - 650px) / 2)
// @media only screen and (min-width: 1200px)
</style>
