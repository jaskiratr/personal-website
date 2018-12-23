<template lang='pug'>
el-dialog.project-modal-container(:visible.sync='showProject', @close='closeProject()', 
  top='2vh', custom-class='project-modal')
  .container(v-if='project')
    el-row
      el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:14, offset:5}')
        h5.section-title {{date(project.timestamp)}}
        h1.section-headline {{project.name}}
        p.section-subheading {{project.summary}}
        div.description(v-html='project.description')

  
</template>

<script>
import { db } from '@/services/firebase-init.js'

export default {
  data() {
    return {
      showProject: false,
      project: null
    }
  },
  mounted() {
    // Open Modal
    this.$bus.$on('openProject', id => {
      this.openProject(id)
    })
    // Close Modal
    this.$bus.$on('closeProject', () => {
      this.closeProject()
    })
  },
  methods: {
    date(timestamp) {
      let date = new Date(timestamp)
      let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      return months[date.getMonth()] + '-' + date.getFullYear()
    },
    addContainerForVideos() {
      // Add container to videos for responsive embed
      var videos = document.querySelectorAll('.ql-video')
      for (let i = 0; i < videos.length; i++) {
        var embedContainer = document.createElement('div')
        embedContainer.setAttribute('class', 'embed-container')
        var parent = videos[i].parentNode
        parent.insertBefore(embedContainer, videos[i])
        embedContainer.appendChild(videos[i])
      }
    },
    openProject(id) {
      try {
        this.$bind('project', db.collection('projects').doc(id))
          .then(project => {
            this.project = project
            this.showProject = true
          })
          .then(() => {
            this.addContainerForVideos()
          })
          .catch(error => {
            console.error(error)
          })
      } catch (error) {
        // Forcing suppression
        // console.error(error)
      }
    },
    closeProject() {
      this.$unbind('project')
      this.project = null
      this.showProject = false
    }
  }
}
</script>

<style lang='sass' scoped>
.project-modal-container /deep/
  
  .el-dialog
    background-color: $color-bg
    border-radius: 5px
    box-shadow: 0px 5px 30px 10px rgba(0,0,0,0.03)
    box-sizing: border-box
  
  .el-dialog__body
    color: $color-text
    padding-bottom: 5em
  
  p, .description
    font-size: 16px
    width: 100%

  .description
    margin-top: 1em
    
    p img
      cursor: auto !important
      max-width: 100%
      padding: 1em 0em
    a
      color: $color-highlight

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) 
  .project-modal-container /deep/
    .project-modal
      width: 90%
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px)
  .project-modal-container /deep/
    .project-modal
      width: 90%
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px)
  .project-modal-container /deep/
    .project-modal
      width: 80%
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px)
  .project-modal-container /deep/
    .project-modal
      width: 60%
</style>
