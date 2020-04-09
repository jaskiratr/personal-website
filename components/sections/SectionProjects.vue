<template lang="pug">
.container
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:12, offset:6}')
      el-row
        el-col(:xs='24', :sm='14', :lg='7')
          h5.section-name {{name}}
          h1.section-heading(:class='{ dark: darkMode }') {{heading}}
          p.section-caption {{caption}}
      
      el-row.section-content
        el-col(:span='24')
          el-row.project-row(:gutter='60' v-for='row in Math.ceil(projects.length / 3)' :key='row')
            el-col.project(:xs='24', :sm='24', :lg='8' v-for='(project, col) in projects.slice((row - 1) * 3, row * 3)' :key='col' )
                p.project-name(:class='{ dark: darkMode }')
                  nuxt-link(:to='"/article?name=projects/" + project.data.attributes.name')
                    span.mono {{padInt(col - 2 + row * 3)}}|
                    span {{project.data.attributes.title}}
                h5.project-role {{project.data.attributes.role}}
                h5.project-date {{project.data.attributes.date}}
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
.project-row
  padding: 2em 0em
.image-container
  height: 100%
  width: 100%
  filter: grayscale(90%)
  box-shadow: 0px 20px 25px 0 rgba(0,0,0,.2), 0px 7px 15px 0 rgba(155, 149, 139, 0.08)
  // box-shadow: -6px -6px 26px 0 rgba(255,255,255,0.8), 6px 6px 26px 0 rgba(100,100,100,0.4)

a
  text-decoration: none
  color: $color-highlight

.project-row.dark
  border-bottom: 1px solid $color-highlight-dark

.el-icon-arrow-right
  padding-left: 0.5em

@media only screen and (max-width: 600px)
  .project-row
    margin-bottom: 0
  .project
    padding: 1em 0em

@media only screen and (min-width: 768px)
  .project-row
    margin-bottom: 0
  .project
    padding: 1em 0em

@media only screen and (min-width: 1200px)
  .project-row
    margin-bottom: 2em
</style>
