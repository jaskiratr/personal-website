import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { auth, db, storage } from '@/services/firebase-init.js'

db.settings({ timestampsInSnapshots: true })
const createStore = () => {
  return new Vuex.Store({
    state: {
      owner: null,
      darkMode: false,
      content: {},
      projects: {}
    },
    getters: {
      owner: state => state.owner,
      darkMode: state => state.darkMode,
      content: state => state.content,
      projects: state => state.projects
    },
    mutations: {
      ...firebaseMutations,
      setOwner(state, owner) {
        state.owner = owner
      },
      setDarkMode(state, payload) {
        state.darkMode = payload
      }
    },
    actions: {
      setDarkMode: (store, payload) => {
        if (typeof payload === 'boolean') {
          store.commit('setDarkMode', payload)
        }
      },
      setProjects: firebaseAction(({ bindFirebaseRef }) => {
        return new Promise((resolve, reject) => {
          bindFirebaseRef('projects', db.collection('projects')).then(() => {
            resolve()
          })
        })
      }),
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
      signOut({ commit }) {
        auth
          .signOut()
          .then(() => {
            commit('setOwner', null)
          })
          .catch(error => console.log(error))
      },
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
