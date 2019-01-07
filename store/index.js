/**
 * @module Store
 * @desc Vuex Store
 */
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { auth, db, storage } from '@/services/firebase-init.js'

db.settings({ timestampsInSnapshots: true })
const createStore = () => {
  return new Vuex.Store({
    /**
     * @method state
     * @desc
     * - `owner` - Stores authenticated user details
     * - `darkMode` - Stores boolean for dark mode theme
     * - `content` - Stores all website content, except projects
     * - `projects` - Stores content for all projects
     */
    state: {
      owner: null,
      darkMode: false,
      content: {},
      projects: {}
    },
    /**
     * @method Getters
     * @desc
     * - `owner` - returns `state.owner`
     * - `darkMode` - returns `state.darkMode`
     * - `content` - returns `state.content`
     * - `projects` - returns `state.projects`
     */
    getters: {
      owner: state => state.owner,
      darkMode: state => state.darkMode,
      content: state => state.content,
      projects: state => state.projects
    },
    mutations: {
      /**
       * @method Mutations-firebaseMutations
       * @desc Binding for Firestore
       */
      ...firebaseMutations,
      /**
       * @method Mutations-setOwner
       * @desc Stores authenticated user or owner's details in `state.owner`
       * @param {Object} state Vuex store state
       * @param {Boolean} owner Owner's details
       */
      setOwner(state, owner) {
        state.owner = owner
      },
      /**
       * @method Mutations-setDarkMode
       * @desc Sets boolean for dark mode
       * @param {Object} state Vuex store state
       * @param {Boolean} payload Dark mode theme state
       */
      setDarkMode(state, payload) {
        state.darkMode = payload
      }
    },
    actions: {
      /**
       * @method Actions-setDarkMode
       * @desc Commits `setDarkMode` with a boolean value
       * @param {Object} store Vuex store
       * @param {Boolean} payload Dark mode theme state
       */
      setDarkMode: (store, payload) => {
        if (typeof payload === 'boolean') {
          store.commit('setDarkMode', payload)
        }
      },
      /**
       * @method Actions-setProjects
       * @desc Firebase Action to bind `projects` ordered by `order` to `state.projects`
       * @returns {Promise}
       */
      setProjects: firebaseAction(({ bindFirebaseRef }) => {
        return new Promise((resolve, reject) => {
          bindFirebaseRef(
            'projects',
            db.collection('projects').orderBy('order')
          ).then(() => {
            resolve()
          })
        })
      }),
      /**
       * @method Actions-setContent
       * @desc Firebase Action to bind content with respective sections
       * @returns {Promise}
       */
      setContent: firebaseAction(({ bindFirebaseRef }) => {
        let sections = [
          'sectionLanding',
          'sectionBio',
          'sectionExperience',
          'sectionProjects',
          'sectionRecognition',
          'sectionFooter'
        ]
        return new Promise((resolve, reject) => {
          async function bindContent() {
            await Promise.all(
              sections.map(async section => {
                let key = 'content.' + section
                let ref = db.collection('content').doc(section)
                await bindFirebaseRef(key, ref)
              })
            )
            resolve()
          }
          bindContent()
        })
      }),
      /**
       * @method Actions-signIn
       * @desc Signs in user with email and password
       * @param {Object} {email,password} Email and password of the user
       * @returns {Promise}
       */
      signIn: (store, { email, password }) => {
        return new Promise((resolve, reject) => {
          auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              resolve()
            })
            .catch(function(error) {
              reject(error)
            })
        })
      },
      /**
       * @method Actions-signOut
       * @desc Signs out authenticated user. Then commits `setOwner` to `null`
       * @param {Object} {commit} Vuex commit
       */
      signOut({ commit }) {
        auth
          .signOut()
          .then(() => {
            commit('setOwner', null)
          })
          .catch(error => console.log(error))
      },
      /**
       * @method Actions-uploadContentImage
       * @desc Uploads the image to Firebase Storage
       * @param {Object} store Vuex store
       * @param {Object} { file, fileName } File contents and file name
       * @returns {Promise}
       */
      uploadContentImage: (store, { file, fileName }) => {
        return new Promise((resolve, reject) => {
          var metadata = { contentType: 'image/jpeg' }
          var uploadTask = storage
            .ref()
            .child('content')
            .child('images/' + fileName)
            .put(file, metadata)
          uploadTask.on(
            'state_changed',
            function(snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log('Upload is ' + progress + '% done')
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused')
                  break
                case 'running':
                  console.log('Upload is running')
                  break
              }
            },
            function(error) {
              reject(error.code)
            },
            function() {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function(downloadURL) {
                  console.log('File available at', downloadURL)
                  resolve(downloadURL)
                })
              // console.log('uploadTask.snapshot', uploadTask.snapshot)
              // var downloadURL = uploadTask.snapshot.downloadURL
            }
          )
        })
      }
    }
  })
}
export default createStore
