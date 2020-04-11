<template lang="pug">
.container
  #canvas-container
  canvas#bgAnimation
</template>
<script>
/* eslint-disable unicorn/number-literal-case */
import { mapGetters } from 'vuex'
import TWEEN from '@tweenjs/tween.js'

const THREE = require('three')

export default {
  data() {
    return {
      minHeight: 1000,
      planes: [],
      spheres: [],
      animating: true,
      animationDuration: 40000, // Seconds
      D: null,
      aspect: null,
      camera: null,
      ambientLight: null,
      directLight: null,
      renderer: null,
      scene: null,
      colors: ['#ff6473', '#acdbdf', '#13334c', '#07617d', '#07617d']
    }
  },
  computed: { ...mapGetters(['darkMode']) },
  mounted() {
    this.$bus.$on('toggleDarkMode', (payload) => {
      this.updateTheme()
    })
    const canvas = document.getElementById('bgAnimation')
    const container = document.getElementById('canvas-container')
    const canvasWidth = container.offsetWidth
    let canvasHeight = container.offsetHeight
    if (canvasHeight < this.minHeight) canvasHeight = this.minHeight

    this.aspect = canvasWidth / canvasHeight

    const lightPos = { x: 220, y: 230, z: 220 }
    this.D = 12
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-this.D * this.aspect, this.D * this.aspect, this.D, -this.D, 1, 1000)
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true
    })

    this.renderer.setSize(canvasWidth, canvasHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.shadowMapWidth = 512
    this.renderer.shadowMapHeight = 512
    this.renderer.shadowMapSoft = true

    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
    container.appendChild(this.renderer.domElement)
    this.ambientLight = new THREE.AmbientLight(0xcccccc, 1.5)
    this.scene.add(this.ambientLight)
    this.directLight = new THREE.DirectionalLight(0xffffff, 0.55)
    this.directLight.position.set(lightPos.x, lightPos.y, lightPos.z)

    this.directLight.castShadow = true
    this.directLight.shadow.camera.left = -20
    this.directLight.shadow.camera.right = 20
    this.directLight.shadow.camera.top = 20
    this.directLight.shadow.camera.bottom = -20

    this.camera.position.set(20, 20, 20)
    this.camera.lookAt(this.scene.position)

    for (let i = 0; i < 30; i++) {
      const w = 10 * Math.random() + 0.5
      const h = 10 * Math.random() + 0.5
      let x = 10 * Math.random()
      let y = 12 * Math.random()
      let z = 5 * Math.random()

      if (!this.darkMode) this.plane(w, h, x, y, z)
      else this.planeDark(w, h, x, y, z)

      x = 10 * Math.random()
      y = 10 * Math.random()
      z = 10 * Math.random()

      if (!this.darkMode) this.sphere(x, y, z)
      else this.sphereDark(x, y, z)
    }

    this.scene.add(this.directLight)
    if (this.animating) this.render()
    window.addEventListener('resize', this.onWindowResize, false)
  },
  methods: {
    onWindowResize() {
      // const canvas = document.getElementById('bgAnimation')
      const container = document.getElementById('canvas-container')
      const canvasWidth = container.offsetWidth
      let canvasHeight = container.offsetHeight
      // const canvasHeight = container.offsetHeight
      if (canvasHeight < this.minHeight) canvasHeight = this.minHeight
      this.aspect = canvasWidth / canvasHeight

      // var aspect = window.innerWidth / window.innerHeight

      this.camera.left = -this.D * this.aspect
      this.camera.right = this.D * this.aspect
      this.camera.top = this.D
      this.camera.bottom = -this.D
      // -this.D * this.aspect, this.D * this.aspect, this.D, -this.D, 1, 1000)
      this.camera.updateProjectionMatrix()
      console.log(canvasWidth, canvasHeight)
      this.renderer.setSize(canvasWidth, canvasHeight)
    },
    generateTexture() {
      const size = 128
      // create canvas
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      // get context
      const context = canvas.getContext('2d')
      // draw gradient
      context.rect(0, 0, size, size)
      const gradient = context.createLinearGradient(0, 0, size, size)
      gradient.addColorStop(0, this.colors[Math.floor(Math.random() * this.colors.length)])
      gradient.addColorStop(1, this.colors[Math.floor(Math.random() * this.colors.length)])
      context.fillStyle = gradient
      context.fill()
      return canvas
    },
    plane(w, h, x, y, z) {
      const boxGeometry = new THREE.BoxGeometry(w, 0.3, h)
      const boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xaaaaff,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      })
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
      const edgesGeometry = new THREE.EdgesGeometry(boxMesh.geometry) // or WireframeGeometry
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x0460f5,
        linewidth: 1
      })
      const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial)
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
      this.scene.add(boxMesh)
      // const geometry = new THREE.BoxGeometry(w, 0.15, h)
      // // material texture
      // const texture = new THREE.Texture(this.generateTexture())
      // texture.needsUpdate = true // important!
      // // material
      // const material = new THREE.MeshPhongMaterial({
      //   map: texture,
      //   transparent: true
      // })
      // const mesh = new THREE.Mesh(geometry, material)
      // mesh.position.x = x + Math.random() * 5
      // mesh.position.y = y
      // mesh.position.z = z + Math.random() * 5
      // mesh.castShadow = true // default is false
      // mesh.receiveShadow = true // default
      // this.planes.push(mesh)
      // if (Math.random() > 0.5) {
      //   new TWEEN.Tween(mesh.position)
      //     .to({ z: z }, Math.random() * (25000 - 5000) + 5000)
      //     .easing(TWEEN.Easing.Sinusoidal.InOut)
      //     .start()
      // } else {
      //   new TWEEN.Tween(mesh.position)
      //     .to({ x: x }, Math.random() * (50000 - 5000) + 5000)
      //     .easing(TWEEN.Easing.Sinusoidal.InOut)
      //     .start()
      // }
      // this.scene.add(mesh)
    },
    sphere(x, y, z) {
      const sphereGeometry = new THREE.SphereGeometry(0.15, 2, 2)
      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      })
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
      const edgesGeometry = new THREE.EdgesGeometry(sphereMesh.geometry) // or WireframeGeometry
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x0460f5,
        linewidth: 1
      })
      const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial)
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
      this.scene.add(sphereMesh)
      // const geometry = new THREE.SphereGeometry(0.1, 8, 8)
      // const texture = new THREE.Texture(this.generateTexture())
      // texture.needsUpdate = true // important!
      // const material = new THREE.MeshPhongMaterial({
      //   map: texture,
      //   transparent: true
      // })
      // const mesh = new THREE.Mesh(geometry, material)
      // mesh.position.x = x
      // mesh.position.y = y + Math.random() * 3
      // mesh.position.z = z
      // mesh.castShadow = true // default is false
      // mesh.receiveShadow = true // default
      // // new TWEEN.Tween(mesh.position).to({ y: y }, Math.random() * (50000 - 20000) + 20000).easing(TWEEN.Easing.Bounce.InOut).start()
      // if (Math.random() > 0.5) {
      //   new TWEEN.Tween(mesh.position)
      //     .to({ y: y }, Math.random() * (50000 - 5000) + 5000)
      //     .easing(TWEEN.Easing.Back.InOut)
      //     .start()
      // } else {
      //   new TWEEN.Tween(mesh.position)
      //     .to({ y: y + 2 }, Math.random() * (50000 - 5000) + 5000)
      //     .easing(TWEEN.Easing.Back.InOut)
      //     .start()
      // }
      // this.spheres.push(mesh)
      // this.scene.add(mesh)
    },
    planeDark(w, h, x, y, z) {
      const boxGeometry = new THREE.BoxGeometry(w, 0.3, h)
      const boxMaterial = new THREE.MeshPhongMaterial({
        color: 0x101011,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      })
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
      const edgesGeometry = new THREE.EdgesGeometry(boxMesh.geometry) // or WireframeGeometry
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x99ddd5,
        linewidth: 1
      })
      const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial)
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
      this.scene.add(boxMesh)
    },
    sphereDark(x, y, z) {
      const sphereGeometry = new THREE.SphereGeometry(0.15, 2, 2)
      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      })
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
      const edgesGeometry = new THREE.EdgesGeometry(sphereMesh.geometry) // or WireframeGeometry
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0xff7575,
        linewidth: 1
      })
      const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial)
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
      this.scene.add(sphereMesh)
    },
    render() {
      if (this.animating) requestAnimationFrame(this.render)
      setTimeout(() => {
        this.animating = false
      }, this.animationDuration)
      this.renderer.render(this.scene, this.camera)
      for (let i = 0; i < this.spheres.length; i++) {
        this.spheres[i].position.y += Math.sin(Date.now() / i / 1000) / 500
      }
      TWEEN.update()
    },
    clearScene() {
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0])
      }
      this.planes = []
      this.spheres = []
    },
    updateTheme() {
      this.clearScene()
      for (let i = 0; i < 30; i++) {
        const w = 10 * Math.random() + 0.5
        const h = 10 * Math.random() + 0.5
        let x = 10 * Math.random()
        let y = 12 * Math.random()
        let z = 5 * Math.random()

        if (!this.darkMode) this.plane(w, h, x, y, z)
        else this.planeDark(w, h, x, y, z)

        x = 10 * Math.random()
        y = 10 * Math.random()
        z = 10 * Math.random()

        if (!this.darkMode) this.sphere(x, y, z)
        else this.sphereDark(x, y, z)
      }
      this.scene.add(this.ambientLight)
      this.scene.add(this.directLight)
      this.render()
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100%
  position: relative
  -webkit-animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)
  -moz-animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)
  -ms-animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)
  -o-animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)
  animation: fade-in 2s cubic-bezier(0.22, 0.61, 0.36, 1)

#canvas-container
  display: flex
  width: 100%
  height: 100%
  z-index: 1
  display: flex
  align-items: center
  justify-content: center
#bgAnimation
  width: 100%
  height: 100%
  margin: auto
  // width: 100%
</style>
