<template lang='pug'>
el-dialog.project-modal-container(:visible.sync='showProject', @close='closeProject()', 
  top='2vh', custom-class='project-modal', :show-close='false', :class='{ dark: darkMode }')
  .container(v-if='project')
    //- Close button on top for small screen devices
    el-row.close-bar
      p(@click='closeProject()'): i.el-icon-close
    //- Project Content
    el-row
      el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:14, offset:5}')
        h5.section-title {{date(project.timestamp)}}
        h1.section-headline {{project.name}}
        p.section-subheading {{project.summary}}
        div.description(v-html='project.description')
</template>

<script>
/**
 * @module Component-ProjectDetails
 * @desc Modal for viewing project details
 * @vue-computed {Boolean} darkMode - Dark mode state
 * @vue-data {Boolean} [showProject=false] - True if the modal is visible when the project content is loaded
 * @vue-data {Object} [project=null] - Object containing project details
 */

/**
 * **Listens** to bus for open project event
 * @event openProject
 * @property {String} id Project Id from Firestore
 */

/**
 * **Listens** to bus for close project event
 * @event closeProject
 */
import { db } from '@/services/firebase-init.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showProject: false,
      project: null
    }
  },
  computed: { ...mapGetters(['darkMode']) },
  mounted() {
    this.$bus.$on('openProject', id => {
      this.openProject(id)
    })
    // Close Modal
    this.$bus.$on('closeProject', () => {
      this.closeProject()
    })
  },
  methods: {
    /**
     * Parses project unix timestamp into MM-YYYY format
     * @param {Integer} timestamp Unix timestamp of the project
     * @returns {String} Parsed date in MM-YYYY format
     */
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
    /**
     * Wraps embedded video elements of class `.ql-video` inside Quill containers with `.embed-container` class.
     * Used for applying responsive size styling for embedded videos using custom global styles.
     * @param {Integer} timestamp Unix timestamp of the project
     * @returns {String} Parsed date in MM-YYYY format
     */
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
    /**
     * Binds the project from Firestore to `project` of the component
     * - Then opens the project modal
     * - Then pushes `project.name` hash parameter to the url history
     * @param {String} id Firestore ID of the project
     */
    openProject(id) {
      try {
        this.$bind('project', db.collection('projects').doc(id))
          .then(project => {
            this.project = project
            this.showProject = true
            return project
          })
          .then(project => {
            this.addContainerForVideos()
            this.$router.push('./#' + project.name)
            // history.pushState('forward', null, './#' + project.name)
          })
          .catch(error => {
            console.error(error)
          })
      } catch (error) {
        // Forcing suppression. TypeError caused during live-reloading
        // console.error(error)
      }
    },
    /**
     * Unbinds the project from Firestore from `project` of the component
     * - Closes the project modal
     * - Clears the hash parameter from the url
     */
    closeProject() {
      this.$unbind('project')
      this.project = null
      this.showProject = false
      this.$router.push('./')
    }
  }
}
</script>

<style lang='sass' scoped>
.project-modal-container /deep/
  .close-bar
    display: none
    position: fixed
    width: 100%
    top: 0
    left: 0
    padding: 1em
    text-align: center
    background-color: $color-bg-2
    color: $color-highlight
    border-bottom: 1px solid $color-highlight
    z-index: 10

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

.project-modal-container.dark /deep/
  background-color: $color-bg-dark-2

  .close-bar
    background-color: $color-bg-dark-2
    color: $color-highlight-dark
    border-bottom: 1px solid $color-highlight-dark

  .el-dialog
    background-color: $color-bg-dark
  
  .el-dialog__body
    color: $color-text-dark
  
  a
    color: $color-highlight-dark

  /* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) 
  .project-modal-container /deep/
    .close-bar
      display: block
    
    .project-modal
      width: 90%

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px)
  .project-modal-container /deep/
    .close-bar
      display: block
  
    .project-modal
      width: 90%

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px)
  .project-modal-container /deep/
    .close-bar
      display: block
    
    .project-modal
      width: 80%

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px)
  .project-modal-container /deep/
    .close-bar
      display: none
    .project-modal
      width: 60%
</style>
