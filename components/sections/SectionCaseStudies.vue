<template lang="pug">
.container
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:12, offset:6}')
      el-row
        el-col(:xs='24', :sm='14', :lg='7')
          h5.section-name {{name}}
          h1.section-heading(:class='{ dark: darkMode }') {{heading}}
          p.section-caption {{caption}}
      
      el-row.section-content
        el-col(:span='24')
          //- p projects {{projects}}
          el-row.project-row(v-for='(project, id) in projects' :key='id' type='flex' align='middle')
            .wrapper(:class='isOddEven(id)')
              el-col.project-content(:sm='{span:24, offset:0}', :md='{span:12, offset:0}', :lg='{span:10, offset:0}', :xl='{span:8, offset:0}' :class='{ dark: darkMode }')
                .wrapper
                  h1.project-num.mono {{padInt(id+1)}}|
                  h5.project-role {{project.data.attributes.role}}
                  h5.project-date {{project.data.attributes.date}}
                  h1.project-name(:class='{ dark: darkMode }') 
                    nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                      span {{project.data.attributes.title}}
                  p.project-excerpt {{project.data.attributes.excerpt}}
                  nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                    el-button.v-button Read More
              el-col.project-image(:sm='{span:24, offset:0}', :md='{span:12, offset:0}', :lg='{span:14, offset:0}', :xl='{span:16, offset:0}')
                .image-container
                  nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                    image-responsive(:imageURL='project.data.attributes.hero' :height="'405'" :alt='project.data.attributes.title')
</template>

<script>
import { mapGetters } from 'vuex'
import fm from '~/content/SectionCaseStudies.md'

export default {
  transition: 'page',
  components: {
    Content: {
      extends: fm.vue.component
    }
  },
  data() {
    return {
      name: fm.attributes.name,
      heading: fm.attributes.heading,
      caption: fm.attributes.caption,
      projects: []
    }
  },
  computed: { ...mapGetters(['darkMode']) },
  mounted() {
    this.importAll(require.context('../../content/case-studies/', true, /\.md$/))
  },
  methods: {
    isOddEven(id) {
      if (id % 2 === 0) return 'even'
      else return 'odd'
    },
    importAll(r) {
      r.keys().forEach((key) => this.projects.push({ data: r(key), path: key }))
    },
    padInt(num) {
      return num.toString().padStart(2, '0')
    },
    openProject(id) {
      this.$bus.$emit('openProject', id)
    }
  }
}
</script>

<style lang="sass" scoped>
a
  text-decoration: none
.project-row
  padding: 4em 0em
  .project-excerpt
    max-width: 300px
  .project-num
    position: absolute
    top: 0em
    left: 0em
    padding: 1em
    font-size: 2em
  .project-content
    z-index: 10
    position: sticky
    background: $color-bg-2
    padding: 3em 2em
    min-height: 600px
    display: flex
    flex-flow: column-reverse
    border-radius: 10px
    box-shadow: 5px 5px 10px 3px rgba(0,0,0,.01), 0px 7px 15px 0 rgba(0,0,0, 0.02)
    .project-name, .project-role
      color: $color-highlight
  .project-content.dark
    background: $color-bg-dark-2
    .project-name, .project-role
      color: $color-highlight-dark
  .image-container
    z-index: 1
    height: 100%
    width: 100%
    border-radius: 10px
    box-shadow: 0px 10px 25px 0 rgba(0,0,0,.05), 0px 7px 15px 0 rgba(0,0,0, 0.02)
    filter: grayscale(50%)

@media only screen and (max-width: 600px)
  .project-row
    margin-bottom: 0
    .project-content
      min-height: inherit
    .project-num
      position: relative
      padding: inherit
    .image-container
      margin-top: 0px
    .project-excerpt
      max-width: inherit
  .project-row .odd
    .project-content
      float: right
      transform: translate(0px, 0px)
    .project-image
      float: right
  .project-row .even
    .project-content
      transform: translate(0px, 0px)
    .project-image
      margin-left: 0px
  .project
    padding: 1em 0em

@media only screen and (min-width: 768px)
  .project-row
    margin-bottom: 0
    .project-content
      min-height: inherit
    .project-num
      position: relative
      padding: inherit
    .image-container
      margin-top: 0px
    .project-excerpt
      max-width: inherit
  .project-row .odd
    .project-content
      float: right
      transform: translate(0px, 0px)
    .project-image
      float: right
  .project-row .even
    .project-content
      transform: translate(0px, 0px)
    .project-image
      margin-left: 0px
  .project
    padding: 1em 0em

@media only screen and (min-width: 1200px)
  .project-row
    margin-bottom: 2em
    .project-content
      min-height: 600px
      display: flex
    .image-container
      margin-top: -50px
  .project-row .odd
    .project-content
      float: right
      transform: translate(-50px, 0px)
    .project-image
      float: right
  .project-row .even
    .project-content
      transform: translate(0px, 0px)
    .project-image
      margin-left: -50px
</style>
