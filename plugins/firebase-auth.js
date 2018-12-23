import { auth } from '@/services/firebase-init.js'
import Cookie from 'js-cookie'

export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(owner => {
      Cookie.set('owner', owner)
      store.commit('setOwner', owner)
      resolve()
    })
  })
}
