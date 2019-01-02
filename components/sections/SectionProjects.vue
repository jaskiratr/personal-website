<template lang='pug'>
.container(v-if='content')
  el-row
    el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:14, offset:5}')
      
      el-row
        el-col(:xs='24', :sm='14', :lg='7')
          h5.section-title {{content.sectionTitle}}
          h1.section-headline {{content.headline}}
          p.section-subheading {{content.subheading}}
      
      el-row.section-content
        el-col(:span='24')
          el-row.project-row(:gutter='60' v-for='row in Math.ceil(projects.length / 3)' :key='row')
            el-col.project(:xs='24', :sm='24', :lg='8' v-for='(project, col) in projects.slice((row - 1) * 3, row * 3)' :key='col' )
              p.project-index.mono-font(@click='openProject(project.id)', :class='{ dark: darkMode }') {{padInt(project.order)}}
                i.el-icon-arrow-right
              p.project-name(@click='openProject(project.id)', :class='{ dark: darkMode }') {{project.name}}
              
              p.project-summary {{project.summary}}
  
  //- Project Detail Modal
  ProjectDetails

</template>

<script>
/**
 * @module SectionProjects
 * @desc Section for project showcase
 *
 * @vue-data {Boolean} [showSidebar=false] - Current visibility of the sidebar
 */
import Sidebar from '~/components/Sidebar'
import ProjectDetails from '~/components/ProjectDetails'
import { mapGetters } from 'vuex'

export default {
  /**
   * - Sidebar
   */
  components: { Sidebar, ProjectDetails },
  props: {
    content: {
      type: Object,
      default: function() {
        return null
      }
    },
    projects: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      showSidebar: false,
      sidebarContent: '',
      // projects: null,
      activeProject: null
    }
  },
  computed: { ...mapGetters(['darkMode']) },
  methods: {
    padInt(num) {
      return num.toString().padStart(2, '0')
    },
    openProject(id) {
      this.$bus.$emit('openProject', id)
    },
    /**
     * Opens the sidebar
     */
    openSidebar() {
      this.showSidebar = true
    },
    /**
     * Closes the sidebar
     */
    closeSidebar() {
      this.showSidebar = false
    }
  }
}
</script>

<style lang='sass' scoped>
.project-index, .project-name
  font-weight: 700
  margin-bottom: 0.5em
  color: $color-highlight
  cursor: pointer

.project-index.dark, .project-name.dark
  color: $color-highlight-dark

.el-icon-arrow-right
  padding-left: 0.5em

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px)
  .project-row
    margin-bottom: 0
  .project
    padding: 1em 0em

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px)
  .project-row
    margin-bottom: 0
  .project
    padding: 1em 0em

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px)
  .project-row
    margin-bottom: 5em
</style>
