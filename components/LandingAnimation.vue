<template lang="pug">
.container
  #canvas-container
  canvas#bgAnimation
</template>
<script>
import { mapGetters } from 'vuex'

var THREE = require('three')
var TWEEN = require('@tweenjs/tween.js')
var D, aspect, camera, ambientLight, directLight, renderer, scene
var colors = ['#ff6473', '#acdbdf', '#13334c', '#07617d', '#07617d']

export default {
  data() {
    return {
      planes: [],
      spheres: [],
      animating: true,
      animationDuration: 40000 // Seconds
    }
  },
  computed: { ...mapGetters(['darkMode']) },
  mounted() {
    this.$bus.$on('toggleDarkMode', payload => {
      this.updateTheme()
    })

    var canvas = document.getElementById('bgAnimation')
    var container = document.getElementById('canvas-container')
    var canvasWidth = 900
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
    ambientLight = new THREE.AmbientLight(0xcccccc, 1.5)
    scene.add(ambientLight)
    directLight = new THREE.DirectionalLight(0xffffff, 0.55)
    directLight.position.set(lightPos.x, lightPos.y, lightPos.z)

    directLight.castShadow = true
    directLight.shadow.camera.left = -20
    directLight.shadow.camera.right = 20
    directLight.shadow.camera.top = 20
    directLight.shadow.camera.bottom = -20

    camera.position.set(20, 20, 20)
    camera.lookAt(scene.position)

    for (var i = 0; i < 30; i++) {
      var w, h, x, y, z
      w = 10 * Math.random() + 0.5
      h = 10 * Math.random() + 0.5
      x = 10 * Math.random()
      y = 12 * Math.random() + 5
      z = 5 * Math.random() + 5

      if (!this.darkMode) this.plane(w, h, x, y, z)
      else this.planeDark(w, h, x, y, z)

      x = 10 * Math.random()
      y = 10 * Math.random() + 5
      z = 10 * Math.random() + 5

      if (!this.darkMode) this.sphere(x, y, z)
      else this.sphereDark(x, y, z)
    }

    scene.add(directLight)
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
      this.planes.push(mesh)
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
      this.spheres.push(mesh)
      scene.add(mesh)
    },
    planeDark(w, h, x, y, z) {
      var boxGeometry = new THREE.BoxGeometry(w, 0.3, h)
      var boxMaterial = new THREE.MeshPhongMaterial({
        color: 0x101011,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      })
      var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
      var edgesGeometry = new THREE.EdgesGeometry(boxMesh.geometry) // or WireframeGeometry
      var edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x99ddd5,
        linewidth: 1
      })
      var wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial)
      boxMesh.add(wireframe)
      boxMesh.position.x = x + Math.random() * 5
      boxMesh.position.y = y
      boxMesh.position.z = z + Math.random() * 5
      boxMesh.castShadow = true // default is false
      boxMesh.receiveShadow = true // default
      this.planes.push(boxMesh)
      if (Math.random() > 0.5) {
        new TWEEN.Tween(boxMesh.position)
          .to({ z: z }, Math.random() * (25000 - 5000) + 5000)
          .easing(TWEEN.Easing.Sinusoidal.InOut)
          .start()
      } else {
        new TWEEN.Tween(boxMesh.position)
          .to({ x: x }, Math.random() * (50000 - 5000) + 5000)
          .easing(TWEEN.Easing.Sinusoidal.InOut)
          .start()
      }
      scene.add(boxMesh)
    },
    sphereDark(x, y, z) {
      var sphereGeometry = new THREE.SphereGeometry(0.2, 2, 2)
      var sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      })
      var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
      var edgesGeometry = new THREE.EdgesGeometry(sphereMesh.geometry) // or WireframeGeometry
      var edgesMaterial = new THREE.LineBasicMaterial({
        color: 0xff7575,
        linewidth: 1
      })
      var wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial)
      sphereMesh.add(wireframe)
      sphereMesh.position.x = x
      sphereMesh.position.y = y + Math.random() * 5
      sphereMesh.position.z = z
      sphereMesh.castShadow = true // default is false
      sphereMesh.receiveShadow = true // default
      if (Math.random() > 0.5) {
        new TWEEN.Tween(sphereMesh.position)
          .to({ y: y }, Math.random() * (50000 - 5000) + 5000)
          .easing(TWEEN.Easing.Back.InOut)
          .start()
      } else {
        new TWEEN.Tween(sphereMesh.position)
          .to({ y: y + 1 }, Math.random() * (50000 - 5000) + 5000)
          .easing(TWEEN.Easing.Back.InOut)
          .start()
      }
      this.spheres.push(sphereMesh)
      scene.add(sphereMesh)
    },
    render() {
      if (this.animating) requestAnimationFrame(this.render)
      setTimeout(() => {
        this.animating = false
      }, this.animationDuration)
      renderer.render(scene, camera)
      for (let i = 0; i < this.spheres.length; i++) {
        this.spheres[i].position.y += Math.sin(Date.now() / i / 1000) / 500
      }
      TWEEN.update()
    },
    clearScene() {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0])
      }
      this.planes = []
      this.spheres = []
    },
    updateTheme() {
      this.clearScene()
      for (var i = 0; i < 30; i++) {
        var w, h, x, y, z
        w = 10 * Math.random() + 0.5
        h = 10 * Math.random() + 0.5
        x = 10 * Math.random()
        y = 12 * Math.random() + 5
        z = 5 * Math.random() + 5

        if (!this.darkMode) this.plane(w, h, x, y, z)
        else this.planeDark(w, h, x, y, z)

        x = 10 * Math.random()
        y = 10 * Math.random() + 5
        z = 10 * Math.random() + 5

        if (!this.darkMode) this.sphere(x, y, z)
        else this.sphereDark(x, y, z)
      }
      scene.add(ambientLight)
      scene.add(directLight)
      this.render()
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  position: relative
  -webkit-animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)
  -moz-animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)
  -ms-animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)
  -o-animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)
  animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)

#canvas-container
  width: 100%
  z-index: 1
</style>
