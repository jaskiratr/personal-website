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
          //- p projects {{projects}}
          el-row.project-row(v-for='(project, id) in projects' :key='id' :class='{ dark: darkMode }' type='flex' align='middle' :gutter='40')
            el-col.project-content(:span='8' v-if='id%2 == 0') 
              h1.project-name(:class='{ dark: darkMode }') 
                nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                  span.mono {{padInt(id+1)}}|
                  span {{project.data.attributes.title}}
              h5.project-role {{project.data.attributes.role}}
              h5.project-date {{project.data.attributes.date}}
              p.project-excerpt {{project.data.attributes.excerpt}}
              nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                el-button.v-button Read More
            el-col.project-image(:span='16' v-if='id%2 == 0')
              .image-container
                nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                  image-responsive(:imageURL='project.data.attributes.hero' :height="'400'" :alt='project.data.attributes.title')
          
            el-col.project-image(:span='16' v-if='id%2 == 1')
              .image-container
                nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                  image-responsive(:imageURL='project.data.attributes.hero' :height="'400'" :alt='project.data.attributes.title')
            el-col.project-content(:span='8' v-if='id%2 == 1')
              h1.project-name(:class='{ dark: darkMode }') 
                nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                  span.mono {{padInt(id+1)}}|
                  span {{project.data.attributes.title}}
              h5.project-role {{project.data.attributes.role}} 
              h5.project-date {{project.data.attributes.date}}
              p.project-excerpt {{project.data.attributes.excerpt}}
              nuxt-link(:to='"/article?name=case-studies/" + project.data.attributes.name')
                el-button.v-button Read More
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
  padding: 6em 0em
.image-container
  height: 100%
  width: 100%
  box-shadow: 0px 10px 25px 0 rgba(0,0,0,.2), 0px 7px 15px 0 rgba(155, 149, 139, 0.08)

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
