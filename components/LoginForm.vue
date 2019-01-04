<template lang="pug">
.container
  no-ssr
    el-row.card-container
      el-col(:sm='{span:22, offset:1}', :md='{span:16, offset:4}', :lg='{span:6, offset:9}')
        el-card.card(shadow="always")
          div(v-if='owner && !submitting')
            //- Sign Out Form
            p Do you wish to sign out?
            el-button(type='danger' v-on:click='signOut($event)') Sign Out
            el-button(v-on:click='closeLogin($event)') Cancel
          div(v-else-if='!owner')
            //- Sign In Form
            h1.title Sign In
            el-form(:model='signInForm', status-icon='', :rules='formRules', @keyup.enter.native='signIn', ref='signInForm')
                el-form-item(label='Email', prop='email')
                  el-input(v-model='signInForm.email')
                el-form-item(label='Password', prop='pass')
                  el-input(type='password', v-model='signInForm.pass', auto-complete='off')
                el-form-item.cta
                  el-button.v-button(v-on:click='signIn') Sign In
                  router-link(to='/').return-button
                    el-button(type='text') Return
</template>

<script>
/**
 * @module LoginForm
 * @desc Login form component
 * @vue-computed {Object} owner - Signed-in user information from Firebase Auth
 * @vue-data {Boolean} [submitting=false] - True if the form submission is being processed
 * @vue-data {Object} [signInForm.email=''] - Email address provided in the form
 * @vue-data {Object} [signInForm.pass=''] - Password provided in the form
 * @vue-data {Object} [signInForm.checkPass=''] - Password validation flag
 * @vue-data {Object} [formRules.email=''] - Element-UI Form rules for email
 * @vue-data {Object} [formRules.pass=''] - Element-UI  Form rules for password
 */
import { mapGetters } from 'vuex'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.signInForm.checkPass !== '') {
          this.$refs.signInForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      submitting: false,
      signInForm: {
        email: '',
        checkPass: '',
        pass: ''
      },
      formRules: {
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        email: [
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: 'blur,change'
          }
        ]
      }
    }
  },
  computed: { ...mapGetters(['owner']) },
  methods: {
    /**
     * Signs out currently logged in user
     * - Sets `this.submitting` to `true`
     * - Dispatches 'signIn' Vuex function
     * - Then redirects user to admin page of the website
     */
    signIn() {
      this.submitting = true
      this.$store
        .dispatch('signIn', {
          email: this.signInForm.email,
          password: this.signInForm.pass
        })
        .then(() => {
          this.signInForm.email = ''
          this.signInForm.pass = ''
          this.$router.push({ path: 'admin' })
        })
        .catch(error => {
          this.submitting = false
          console.log(error.message)
        })
    },
    /**
     * Signs out currently logged in user
     * - Dispatches 'signOut' Vuex function
     * - Then sets `this.submitting` to `false`
     */
    signOut() {
      this.$store.dispatch('signOut').then(() => {
        this.submitting = false
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.container
  background-color: $color-bg
  height: 100vh
  width: 100%
  display: flex
  align-items: center
  justify-content: center

.card-container
  width: 100%
  margin: 0px 20px

.card
  -webkit-box-shadow: 8px 8px 10px 2px rgba(4, 95, 245, 0.06)
  -moz-box-shadow: 8px 8px 10px 2px rgba(4, 95, 245, 0.06)
  box-shadow: 8px 8px 10px 2px rgba(4, 95, 245, 0.06)

.title
  margin-top: 0.5em
  margin-bottom: 1em

.cta
  margin-top: 3em
  
.return-button
  margin-left: 2em
</style>
