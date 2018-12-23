<template lang='pug'>
div
  el-row.nav-container
    AdminNav
  el-row
    .container
      no-ssr
        el-row
          h2 Projects
          p.page-info Drag the tiles below to rearrange the order.
        el-row(:gutter='20')          
          el-col.project-list(:span='8')
            el-form.section-form(label-width='120px')
              draggable(element='el-collapse', :list='projects', @sort='handleProjectSort', :options="{animation:150}" accordion)
                el-card.project-list-item(v-for='(project, index) in projects', :key='index', shadow='hover')
                  el-tag.project-order-tag(size='mini', type='warning') {{project.order}}
                  span.project-list-name {{project.name}}  
                  el-button-group.project-action-buttons
                    el-button(type='primary', @click='editProject(project)', icon='el-icon-edit', size='mini', round, plain)
                    el-button(type='danger', @click='handleDelete(project)', icon='el-icon-delete', size='mini', round, plain)
              el-button.save-button(type='primary', @click='updateProjectOrder', plain) Update Order
              el-button.new-project-button(type='success', @click='newProject', plain) New Project
          
          el-col.view-project(:span='16')
            el-row
              el-col(:span='24')
                .null-project(v-if='!activeProject')
                  i.el-icon-document
                  p Pick a project to edit
                .active-project(v-else)
                  el-card.project-card
                    el-form
                      
                      el-row.project-form-item-row(:gutter='60')
                        el-col(:span='8')
                          el-form-item(label='Name')
                            el-input(placeholder='Please input' v-model='activeProject.name')
                        el-col(:span='4')
                          el-form-item(label='Date')
                            el-date-picker(v-model='activeProject.timestamp', type='date', value-format='timestamp', placeholder='Pick a day')
                      
                      el-row.project-form-item-row(:gutter='60')
                        el-col(:span='8')
                          el-form-item(label='Link Name')
                            el-input(placeholder='Please input' v-model='activeProject.link')
                        el-col(:span='8')
                          el-form-item(label='Link URL')
                            el-input(placeholder='Please input' v-model='activeProject.linkUrl')
                      
                      el-form-item(label='Summary')
                        el-input(placeholder='Please input' v-model='activeProject.summary')
                      
                      .project-description(v-if='activeProject')
                        .quill-editor(v-model='activeProject.description', v-quill='defaultEditorOption')
                      
                      el-button.save-button(type='primary', @click='saveProject(activeProject)', plain) Save Project
  
  //- Dialog: Confirm Delete
  el-dialog(title='Confirm Deletion', :visible.sync='confirmDelete.visible', width='30%')
    h3 {{confirmDelete.name}}
    br
    p Are you sure you want to permanently delete this project?
    span.dialog-footer(slot='footer')
      el-button(@click='confirmDelete = null') Cancel
      el-button(type='danger', @click='deleteProject(confirmDelete.project)') Confirm

</template>

<script>
import AdminNav from '~/components/AdminNav'
import { db } from '@/services/firebase-init.js'
import MixinImageUpload from '@/mixins/image-upload'
import draggable from 'vuedraggable'

let defaultToolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean']
]

export default {
  scrollToTop: true,
  components: { AdminNav, draggable },
  mixins: [MixinImageUpload],
  data() {
    return {
      projects: [],
      activeProject: null,
      confirmDelete: false,
      defaultEditorOption: {
        modules: {
          toolbar: defaultToolbarOptions,
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          imageUpload: {
            customUploader: (file, next) => {
              this.uploadImage(file)
                .then(url => {
                  next(url)
                })
                .catch(error => {
                  console.error(error)
                })
            }
          }
        }
      }
    }
  },
  firestore: {
    projects: db.collection('projects').orderBy('order')
  },
  methods: {
    handleProjectSort() {
      for (const key in this.projects) {
        if (this.projects.hasOwnProperty(key)) {
          this.projects[key].order = parseInt(key) + 1
        }
      }
    },
    editProject(project) {
      this.activeProject = project
    },
    handleDelete(project) {
      this.confirmDelete = { visible: true, project: project }
    },
    deleteProject(project) {
      this.confirmDelete = { visible: false, project: null }
      db.collection('projects')
        .doc(project.id)
        .delete()
        .then(() => {
          this.$notify({ message: 'Deleted', type: 'success' })
          if (this.activeProject && project.id === this.activeProject.id) {
            this.setLastProjectActive()
          }
        })
        .catch(error => {
          this.$notify.error({ message: error })
        })
    },
    updateProjectOrder() {
      let saveError = false
      for (const key in this.projects) {
        let id = this.projects[key].id
        db.collection('projects')
          .doc(id)
          .set(this.projects[key])
          .catch(error => {
            error = true
            this.$notify.error({ message: error })
          })
      }
      if (!saveError) this.$notify({ message: 'Saved', type: 'success' })
    },
    saveProject(project) {
      // Save existing project
      if (project.id) {
        db.collection('projects')
          .doc(project.id)
          .set(project)
          .then(() => {
            this.$notify({ message: 'Saved', type: 'success' })
            // console.log(this.projects)
          })
          .catch(error => {
            this.$notify.error({ message: error })
          })
      }
      // Save new project
      else {
        db.collection('projects')
          .add(project)
          .then(() => {
            this.$notify({ message: 'Saved', type: 'success' })
            this.setLastProjectActive()
          })
          .catch(error => {
            this.$notify.error({ message: error })
          })
      }
    },
    setLastProjectActive() {
      this.activeProject = this.projects[this.projects.length - 1]
    },
    newProject() {
      let newProjectOrder = this.projects.length + 1
      let newProject = {
        name: 'My New Project',
        order: newProjectOrder,
        description: 'Some data'
      }
      this.activeProject = newProject
    }
  }
}
</script>

<style lang='sass' scoped>
.nav-container
  width: 70%
  margin: auto

.container
  width: 70%
  margin: auto
  padding: 2em 1em
  background-color: $color-bg-admin

.page-info
  margin-top: 1em

.project-order-tag
  margin-right: 1em 

.project-action-buttons
  float: right

.section-form
  padding: 2em 0em
  h3
    margin-bottom: 2em

.quillWrapper
  line-height: normal

.project-list-item /deep/
  .el-card__body
    padding: 15px

.project-list-item:hover
  cursor: move
  background: $color-bg

.project-list-item .sortable-chosen
  cursor: -webkit-grabbing

.project-list-name
  font-size: 14px

.null-project
  margin-top: 10em
  text-align: center
  i
    padding: 1em 0em
    opacity: 0.5
    font-size: 1.5em
  
.project-card
  margin: 2em 0em
  overflow: visible

.project-form-item-row
  margin-top: 1em

.project-description
  margin-top: 3em

.save-button
  margin-top: 2em

.new-project-button
  margin-top: 2em
  float: right

</style>
