<template lang="pug">
.container
  #canvas-container
  canvas#bgAnimation
</template>
<script>
var THREE = require('three')
var TWEEN = require('@tweenjs/tween.js')
var planes = []
var spheres = []
var D, aspect, camera, light, renderer, scene
// var colors = ['#7505ff', '#ff6378', '#4331ea', '#8afcc9', '#ff635b']
var colors = ['#ff6473', '#acdbdf', '#13334c', '#07617d', '#07617d']
export default {
  data() {
    return {
      animating: true,
      animationDuration: 40000 // Seconds
    }
  },
  mounted() {
    var canvas = document.getElementById('bgAnimation')
    var container = document.getElementById('canvas-container')
    var canvasWidth = 1000
    var canvasHeight = 900
    aspect = canvasWidth / canvasHeight

    var lightPos = { x: 220, y: 230, z: 220 }
    D = 15
    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(
      -D * aspect,
      D * aspect,
      D,
      -D,
      1,
      1000
    )
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true
    })

    renderer.setSize(canvasWidth, canvasHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.shadowMapWidth = 512
    renderer.shadowMapHeight = 512
    renderer.shadowMapSoft = true

    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    )
    container.appendChild(renderer.domElement)
    var ambient = new THREE.AmbientLight(0xcccccc, 1.5)
    scene.add(ambient)
    light = new THREE.DirectionalLight(0xffffff, 0.55)
    light.position.set(lightPos.x, lightPos.y, lightPos.z)

    light.castShadow = true
    light.shadow.camera.left = -20
    light.shadow.camera.right = 20
    light.shadow.camera.top = 20
    light.shadow.camera.bottom = -20

    camera.position.set(20, 20, 20)
    camera.lookAt(scene.position)

    for (var i = 0; i < 30; i++) {
      var w, h, x, y, z
      w = 10 * Math.random() + 0.5
      h = 10 * Math.random() + 0.5
      x = 10 * Math.random()
      y = 12 * Math.random() + 5
      z = 5 * Math.random() + 5
      this.plane(w, h, x, y, z)

      x = 10 * Math.random()
      y = 10 * Math.random() + 5
      z = 10 * Math.random() + 5
      this.sphere(x, y, z)
    }

    scene.add(light)
    if (this.animating) this.render()
  },
  methods: {
    generateTexture() {
      var size = 128
      // create canvas
      var canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      // get context
      var context = canvas.getContext('2d')
      // draw gradient
      context.rect(0, 0, size, size)
      var gradient = context.createLinearGradient(0, 0, size, size)
      gradient.addColorStop(
        0,
        colors[Math.floor(Math.random() * colors.length)]
      )
      gradient.addColorStop(
        1,
        colors[Math.floor(Math.random() * colors.length)]
      )
      context.fillStyle = gradient
      context.fill()
      return canvas
    },
    plane(w, h, x, y, z) {
      var geometry = new THREE.BoxGeometry(w, 0.15, h)
      // material texture
      var texture = new THREE.Texture(this.generateTexture())
      texture.needsUpdate = true // important!
      // material
      var material = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true
      })
      var mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = x + Math.random() * 5
      mesh.position.y = y
      mesh.position.z = z + Math.random() * 5
      mesh.castShadow = true // default is false
      mesh.receiveShadow = true // default
      planes.push(mesh)
      if (Math.random() > 0.5) {
        new TWEEN.Tween(mesh.position)
          .to({ z: z }, Math.random() * (25000 - 5000) + 5000)
          .easing(TWEEN.Easing.Sinusoidal.InOut)
          .start()
      } else {
        new TWEEN.Tween(mesh.position)
          .to({ x: x }, Math.random() * (50000 - 5000) + 5000)
          .easing(TWEEN.Easing.Sinusoidal.InOut)
          .start()
      }
      scene.add(mesh)
    },
    sphere(x, y, z) {
      var geometry = new THREE.SphereGeometry(0.1, 8, 8)
      var texture = new THREE.Texture(this.generateTexture())
      texture.needsUpdate = true // important!
      var material = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true
      })
      var mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = x
      mesh.position.y = y + Math.random() * 3
      mesh.position.z = z
      mesh.castShadow = true // default is false
      mesh.receiveShadow = true // default
      // new TWEEN.Tween(mesh.position).to({ y: y }, Math.random() * (50000 - 20000) + 20000).easing(TWEEN.Easing.Bounce.InOut).start()
      if (Math.random() > 0.5) {
        new TWEEN.Tween(mesh.position)
          .to({ y: y }, Math.random() * (50000 - 5000) + 5000)
          .easing(TWEEN.Easing.Back.InOut)
          .start()
      } else {
        new TWEEN.Tween(mesh.position)
          .to({ y: y + 2 }, Math.random() * (50000 - 5000) + 5000)
          .easing(TWEEN.Easing.Back.InOut)
          .start()
      }
      spheres.push(mesh)
      scene.add(mesh)
    },
    render() {
      if (this.animating) requestAnimationFrame(this.render)
      setTimeout(() => {
        this.animating = false
      }, this.animationDuration)
      renderer.render(scene, camera)
      for (let i = 0; i < spheres.length; i++) {
        spheres[i].position.y += Math.sin(Date.now() / i / 1000) / 500
      }
      TWEEN.update()
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  position: relative
#canvas-container
  width: 100%
  z-index: 1
// #bgAnimation
  // z-index: 1
  // position: absolute
  // right: 0
  // top: 0px
  // width: 200px
  // height: 200px
</style>
