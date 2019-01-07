import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import Quill from 'quill'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import { ImageUpload } from 'quill-image-upload'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageUpload', ImageUpload)
Quill.register('modules/imageResize', ImageResize)

Vue.use(VueQuillEditor)
