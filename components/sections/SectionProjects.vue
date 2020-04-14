<template lang="pug">
.container
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:16, offset:4}', :xl='{span:12, offset:6}')
      el-row
        el-col(:xs='24', :sm='14', :lg='7')
          .section-info
            h5.section-name {{name}}
            h1.section-heading(:class='{ dark: darkMode }') {{heading}}
            p.section-caption {{caption}}
      
      el-row.section-content
        el-col(:span='24')
          el-row.project-row(:gutter='40' v-for='row in Math.ceil(projects.length / 3)' :key='row')
            el-col.project(v-for='(project, col) in projects.slice((row - 1) * 3, row * 3)' :key='col' )
              nuxt-link.wrapper.project-link(:to='"/article?name=projects/" + project.data.attributes.name' :class='{ dark: darkMode }')
                h2.project-num.mono {{padInt(col - 2 + row * 3)}}|
                h5.project-role {{project.data.attributes.role}}
                h5.project-date {{project.data.attributes.date}}
                h2.project-name {{project.data.attributes.title}}
                p.project-summary {{project.data.attributes.excerpt}}

</template>

<script>
import { mapGetters } from 'vuex'
import fm from '~/content/SectionProjects.md'

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
    this.importAll(require.context('../../content/projects/', true, /\.md$/))
  },
  methods: {
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
.project-link
  color: $color-text
.project-link.dark
  color: $color-text-dark
.project-num
  font-weight: 700
.project-card-head
  border-radius: 0px 0px 5px 5px
.project-row
  display: flex
.project-summary
  margin-bottom: 1em
.project
  flex: 1
  display: flex
  .wrapper
    width: 100%
    border-radius: 5px
    background: $color-bg-2
    .project-name, .project-role
      color: $color-highlight
  .wrapper.dark
    background: $color-bg-dark-2
    .project-name, .project-role
      color: $color-highlight-dark
a
  text-decoration: none
.image-container
  width: 100%
  margin: 0em 0em
  box-shadow: 0px 5px 12px 0 rgba(0,0,0,.1), 0px 7px 15px 0 rgba(155, 149, 139, 0.08)

.project-row.dark
  border-bottom: 1px solid $color-highlight-dark

.el-icon-arrow-right
  padding-left: 0.5em

@media only screen and (max-width: 600px)
  .project-row
    margin-bottom: 0
    display: block
  .project
    padding: 1em 0em
    .wrapper
      padding: 0.5em 1em 1.5em

@media only screen and (min-width: 768px)
  .project-row
    margin-bottom: 0
    display: block
  .project
    padding: 1em 0em
    .wrapper
      padding: 0.5em 1.5em 1.5em

@media only screen and (min-width: 1200px)
  .project-row
    margin-bottom: 2em
    display: flex
  .project
    .wrapper
      padding: 0.5em 2em 1.5em
</style>
