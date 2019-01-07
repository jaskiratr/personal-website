<template lang='pug'>
div
  el-row.nav-container
    AdminNav
  el-row
    .container
      no-ssr
        .sections
          el-card.box-card
            el-form.section-form(label-width='120px')
              h3 Section: Landing
              el-form-item(label='Banner Title')
                .quill-editor(v-model='contentLanding.bannerTitle', v-quill='titleEditorOption', id='contentLanding.bannerTitle')
              el-form-item(label='Section Title')
                el-input(placeholder='Please input' v-model='contentLanding.sectionTitle')
              el-form-item(label='Headline')
                el-input(placeholder='Please input' v-model='contentLanding.headline')
              el-button.save-button(@click='saveContent("sectionLanding", contentLanding)',
                type='primary', size='mini', plain) Save Page
          
          el-card.box-card
            el-form.section-form(label-width='120px')
              h3 Section: Bio
              el-form-item(label='Section Title')
                el-input(placeholder='Please input' v-model='contentBio.sectionTitle')
              el-form-item(label='Banner Title')
                el-input(placeholder='Please input' v-model='contentBio.headline')
              el-form-item(label='Left Column')
                .quill-editor(v-model='contentBio.descriptionLeft', v-quill='defaultEditorOption', id='contentBio.descriptionLeft')
              el-form-item(label='Right Column')
                .quill-editor(v-model='contentBio.descriptionRight', v-quill='defaultEditorOption', id='contentBio.descriptionRight')
              el-button.save-button(@click='saveContent("sectionBio", contentBio)',
                type='primary', size='mini', plain) Save Page
          
          el-card.box-card
            el-form.section-form(label-width='120px')
              h3 Section: Experience
              el-form-item(label='Section Title')
                el-input(placeholder='Please input' v-model='contentExperience.sectionTitle')
              el-form-item(label='Headline')
                el-input(placeholder='Please input' v-model='contentExperience.headline')
              el-form-item(label='Subheading')
                el-input(placeholder='Please input' v-model='contentExperience.subheading')
              el-form-item(label='Resume Link')
                el-input(placeholder='Please input' v-model='contentExperience.resumeLink')
              el-form-item(label='Left Column')
                .quill-editor(v-model='contentExperience.descriptionLeft', v-quill='defaultEditorOption', id='contentExperience.descriptionLeft')
              el-form-item(label='Right Column')
                .quill-editor(v-model='contentExperience.descriptionRight', v-quill='defaultEditorOption', id='contentExperience.descriptionRight')
              el-button.save-button(@click='saveContent("sectionExperience", contentExperience)',
                type='primary', size='mini', plain) Save Page
          
          el-card.box-card
            el-form.section-form(label-width='120px')
              h3 Section: Recognition
              el-form-item(label='Section Title')
                el-input(placeholder='Please input' v-model='contentRecognition.sectionTitle')
              el-form-item(label='Headline')
                el-input(placeholder='Please input' v-model='contentRecognition.headline')
              el-form-item(label='Subheading')
                el-input(placeholder='Please input' v-model='contentRecognition.subheading')
              el-form-item(label='Description')
                .quill-editor(v-model='contentRecognition.description', v-quill='defaultEditorOption', id='contentRecognition.description')
              el-button.save-button(@click='saveContent("sectionRecognition", contentRecognition)',
                type='primary', size='mini', plain) Save Page
          
          el-card.box-card
            el-form.section-form(label-width='120px')
              h3 Section: Projects
              el-form-item(label='Section Title')
                el-input(placeholder='Please input' v-model='contentProjects.sectionTitle')
              el-form-item(label='Headline')
                el-input(placeholder='Please input' v-model='contentProjects.headline')
              el-form-item(label='Subheading')
                el-input(placeholder='Please input' v-model='contentProjects.subheading')
              el-button.save-button(@click='saveContent("sectionProjects", contentProjects)',
                type='primary', size='mini', plain) Save Page
           
          el-card.box-card
            el-form.section-form(label-width='120px')
              h3 Section: Footer
              el-form-item(label='Section Title')
                el-input(placeholder='Please input' v-model='contentFooter.sectionTitle')
              el-form-item(label='Description')
                .quill-editor(v-model='contentFooter.description', v-quill='defaultEditorOption', id='contentFooter.description')
              el-button.save-button(@click='saveContent("sectionFooter", contentFooter)',
                type='primary', size='mini', plain) Save Page

</template>

<script>
/**
 * @module Page-admin
 * @desc Admin page for editing website sections content.
 * @vue-data {Object} [contentLanding={}] - Content for Landing Section
 * @vue-data {Object} [contentBio={}] - Content for Bio Section
 * @vue-data {Object} [contentExperience={}] - Content for Experience Section
 * @vue-data {Object} [contentRecognition={}] - Content for Recognition Section
 * @vue-data {Object} [contentProjects={}] - Content for Projects Section
 * @vue-data {Object} [contentFooter={}] - Content for Footer Section
 * @vue-data {Object} [defaultEditorOption=See code]
 * Default options for Vue-Quill Editor toolbar
 * Supports `imageDrop`, `imageResize`, and custom `imageUpload` module.
 * @vue-data {Object} [titleEditoOption=See code] Vue-Quill Editor toolbar options for Title
 */
import AdminNav from '~/components/AdminNav'
import { db } from '@/services/firebase-init.js'
import MixinImageUpload from '@/mixins/image-upload'

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
  /**
   * - AdminNav
   */
  components: { AdminNav },
  /**
   * - MixinImageUpload
   */
  mixins: [MixinImageUpload],
  data() {
    return {
      contentLanding: {},
      contentBio: {},
      contentExperience: {},
      contentRecognition: {},
      contentProjects: {},
      contentFooter: {},
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
      },
      titleEditorOption: {
        modules: { toolbar: [['bold', 'italic', 'underline', 'strike']] }
      }
    }
  },
  /**
   * Firestore bindings for content.
   *
   * **Collection: ** `content`
   *
   * **Documents: **
   * - `contentLanding`: Binds to `sectionLanding`
   * - `contentBio`: Binds to `sectionBio`
   * - `contentExperience` : Binds to `sectionExperience`
   * - `contentRecognition` : Binds to `sectionRecognition`
   * - `contentProjects` : Binds to `sectionProjects`
   * - `contentFooter` : Binds to `sectionFooter`
   */
  firestore: {
    contentLanding: db.collection('content').doc('sectionLanding'),
    contentBio: db.collection('content').doc('sectionBio'),
    contentExperience: db.collection('content').doc('sectionExperience'),
    contentRecognition: db.collection('content').doc('sectionRecognition'),
    contentProjects: db.collection('content').doc('sectionProjects'),
    contentFooter: db.collection('content').doc('sectionFooter')
  },
  methods: {
    /**
     * Saves content document to Firestore
     * - Then notifies the user with success/error message
     * @param {Object} document Firestore reference of the document to be saved
     * @param {Object} payload Content to be saved for the referenced document
     */
    saveContent(document, payload) {
      db.collection('content')
        .doc(document)
        .set(payload)
        .then(() => {
          this.$notify({ message: 'Saved', type: 'success' })
        })
        .catch(error => {
          this.$notify.error({ message: error })
        })
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

.box-card
  margin: 2em 0em

.section-form
  padding: 2em 0em
  h3
    margin-bottom: 2em 

.ql-toolbar.ql-snow
  line-height: normal 
  padding-bottom: 0px

.save-button
  margin-top: 3em
</style>
