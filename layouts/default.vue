<template lang="pug">
#nuxt-wrapper
  nuxt
</template>
<script>
export default {
  mounted() {
    if (window) window.history.scrollRestoration = 'auto'
  }
}
</script>
<style lang="sass">
#nuxt-wrapper
  width: 100%
  height: 100%
  margin: 0px
  padding: 0px
  overflow-x: hidden
html, body
  color: $color-text
  font-family: 'Inter', sans-serif
  font-weight: normal
  margin: 0px
  width: 100%
  height: 100%
  padding: 0px
  background-color: $color-bg

body.dark, html.dark
  background-color: $color-bg-dark
body
  .light
    transition: color 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s
    // background-color: $color-bg
  .dark
    transition: color 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s
    color: $color-text-dark
    // background-color: $color-bg-dark
.footer-container.dark
  background-color: $color-bg-dark-2
h1, h2, h3, h4, h5, h6
  margin-top: 1rem
  margin-bottom: 0.5rem
  // font-family: 'IBM Plex Serif', serif
h1
  font-weight: 700
h2, h3, h4
  line-height: 2rem
  font-weight: 700
h5, h6
  font-weight: 100
hr
  margin-top: 20px
  margin-bottom: 20px
  border: 0
  border-top: 1px solid #eee
blockquote
  padding: 1rem 0
  margin-bottom: 2rem
p, ul
  padding: 0
  margin-top: 0
  margin-bottom: 2rem
p, ul, li
  font-family: 'Inter', sans-serif
  letter-spacing: 0px
  font-weight: 400
  font-size: 1.2rem
  line-height: 2.2rem
  -webkit-font-smoothing: antialiased
// li
//   line-height: 1.8rem
p code
  background-color: #F0F0F0
  color: #f41111
  padding: 2px 3px
  border-radius: 3px
code
  font-family: 'IBM Plex Mono', monospace
dt
  font-weight: bold
table
  border-spacing: 0
  border-collapse: collapse
  width: 100%
  max-width: 100%
  margin-bottom: 20px
th
  text-align: left
  padding-bottom: 10px
  vertical-align: bottom
  border-bottom: 1px solid #dddddd
td
  padding: 8px
  vertical-align: top
  border-top: 1px solid #dddddd
tbody > tr:nth-child(odd)
  background-color: $color-bg-2
ul
  list-style-type: none
  padding-left: 1.2em
  margin-top: 0.5em

ul li:before
  content: '•'
  position: absolute
  margin-left: -1.2em
  margin-top: 0.2em
  font-size: small
a, a:visited, a:hover, a:active
  color: inherit

.el-main
  padding: 0px
.mono
  font-family: 'IBM Plex Mono', monospace

.project-index, .project-name
  color: $color-text
  font-weight: 600
  margin-bottom: 0.5em
  // a, span
    // text-decoration: none
    // color: $color-text
.project-name
  margin-top: 1em
.project-role
  font-family: 'Inter', sans-serif
  text-transform: uppercase
  margin-bottom: 1em
  color: $color-highlight
  transition: color 0.5s ease 0s
// .dark
//   .project-index, .project-name
//     a, span
//       color: $color-text-dark
//   .project-role
//     color: $color-text-dark

.project-excerpt
  padding: 0em 0em 2em
.project-date
  margin-top: -0.25em
.pad-v
  padding: 2em 0em

.footnote-item p
  margin-bottom: 0px
.markdown-content
  img
    max-width: 300px
  p.fade-up
    -webkit-animation: fade-up 1s cubic-bezier(0.22, 0.61, 0.36, 1)
    -moz-animation: fade-up 1s cubic-bezier(0.22, 0.61, 0.36, 1)
    -ms-animation: fade-up 1s cubic-bezier(0.22, 0.61, 0.36, 1)
    -o-animation: fade-up 1s cubic-bezier(0.22, 0.61, 0.36, 1)
    animation: fade-up 1s cubic-bezier(0.22, 0.61, 0.36, 1)

.v-lazy-image
  opacity: 0
  transform: translate3d(20px, 0, 0)
  transition: opacity 0.5s, transform 0.5s

.v-lazy-image-loaded
  opacity: 1
  transform: translate3d(0, 0, 0)

.section-heading
  font-size: 3em
  line-height: 1.1em
  margin-bottom: 1em
  letter-spacing: -0.02em

.section-name
  font-family: 'Inter', sans-serif
  text-transform: uppercase
  margin-bottom: 1em
  color: $color-highlight
  transition: color 0.5s ease 0s

.section-caption
  padding-bottom: 3em
  border-bottom: 2px solid $color-highlight
  transition: color 0.5s ease 0s

.section-content
  margin-top: 3em

.section-container
  padding: 10em 0em
  display: flex
  justify-content: center
  flex-direction: column

.footer-container
  padding: 10em 0em
  background-color: $color-bg-2
  transition: background-color 0.5s ease 0s

.full-height
  min-height: 100vh

.embed-container
  position: relative
  padding-bottom: 56.25%
  margin: 2rem 0rem
  border-radius: 5px
  height: 0
  overflow: hidden
  max-width: 100%
  opacity: 0
  -webkit-animation: fadeUp ease 1
  -moz-animation: fadeUp ease 1
  animation: fadeUp ease 1
  -webkit-animation-fill-mode: forwards
  -moz-animation-fill-mode: forwards
  animation-fill-mode: forwards
  -webkit-animation-duration: 0.4s
  -moz-animation-duration: 0.4s
  animation-duration: 0.4s
  -webkit-animation-delay: 0.8s
  -moz-animation-delay: 0.8s
  animation-delay: 0.8s

.embed-container iframe, .embed-container object, .embed-container embed
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

.ql-align-center
  text-align: center

.ql-toolbar.ql-snow
  line-height: normal
  padding-bottom: 0px

.v-modal
  opacity: .4
  background: $color-bg-2

.v-button
  position: relative
  font-weight: 700
  letter-spacing: 0.5px
  color: $color-highlight
  border: none
  -webkit-box-shadow: 3px 3px 10px 2px rgba(4, 95, 245, 0.1)
  -moz-box-shadow: 3px 3px 10px 2px rgba(4, 95, 245, 0.1)
  box-shadow: 3px 3px 10px 2px rgba(4, 95, 245, 0.1)
  top: 0px
  left: 0px
  transition: all 0.15s ease 0s

.v-button:hover
  top: -1px
  left: -1px
  -webkit-box-shadow: 8px 8px 15px 2px rgba(4, 95, 245, 0.1)
  -moz-box-shadow: 8px 8px 15px 2px rgba(4, 95, 245, 0.1)
  box-shadow: 8px 8px 15px 2px rgba(4, 95, 245, 0.1)
  color: $color-highlight
  background-color: $color-bg

body::-webkit-scrollbar-track
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.25)
  background-color: $color-bg-2
body::-webkit-scrollbar
  width: 7px
  background-color: $color-bg-2
body::-webkit-scrollbar-thumb
  background-color: $color-highlight
  border-radius: 3px

.dark
  body::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.25)
    background-color: $color-bg-dark-2
  body::-webkit-scrollbar
    width: 7px
    background-color: $color-bg-dark-2
  body::-webkit-scrollbar-thumb
    background-color: $color-highlight-dark
    border-radius: 3px

  tbody > tr:nth-child(odd)
    background-color: $color-bg-dark-2
  .section-name
    color: $color-text-dark

  .section-heading
    color: $color-highlight-dark

  .section-caption
    border-bottom: 2px solid $color-highlight-dark

  .v-button
    background-color: $color-bg-dark
    border: 1px solid $color-highlight-dark
    color: $color-highlight-dark

  .v-button:hover
    background-color: $color-bg-dark

@media only screen and (max-width: 600px)
  .section-container
    padding: 4em 0em
    border-bottom: 2px solid $color-highlight

  .footer-container
    padding: 6em 0em

  .section-heading
    font-size: 1.5em

  .section-caption
    padding-bottom: 1em
    border-bottom: none

  .dark
    .section-caption
      border-bottom: none

    .section-container
      border-bottom: 2px solid $color-highlight-dark

@media only screen and (min-width: 600px)
  .section-container
    padding: 6em 0em

  .footer-container
    padding: 6em 0em

@media only screen and (min-width: 992px)
  .section-container
    padding: 9em 0em

  .footer-container
    padding: 8em 0em

@media only screen and (min-width: 1200px)
  .section-container
    padding: 8em 0em

  .footer-container
    padding: 8em 0em
</style>
