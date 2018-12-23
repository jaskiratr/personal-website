<template lang='pug'>
.nav
  no-ssr
    el-row
      el-col.links(:span='16')
        router-link(to='/'): el-button.nav-link(type='text', plain) Home
        router-link(to='/admin'): el-button.nav-link(type='text', plain) Admin
        router-link(to='/admin/projects'): el-button.nav-link(type='text', plain) Projects
      el-col.user(:span='8')
        p.user-email(v-if='owner') {{owner.email}}
        el-button.sign-out-button(type='danger', v-on:click='signOut($event)', size='mini', plain) Sign Out
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: { ...mapGetters(['owner']) },
  methods: {
    signOut() {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.nav
  margin: 2em 0em

.links
  margin-top: 2em

.nav-link
  // margin-right: 2em
  padding: 1em 2em

.user-email
  color: $color-highlight
  text-align: right

.sign-out-button
  float: right
  margin-top: 1em
</style>
