import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({ antialias: true })
const controls = new OrbitControls( camera, renderer.domElement )

setup()
async function setup ()
{
    camera.position.z = -4
    scene.add(new THREE.AmbientLight(0xFFFFFF))
    scene.add(camera)

    setupRenderer()
    setupControls()
    spawnCube()

    requestAnimationFrame(update)
}
function spawnCube()
{
    const fgeometry = new THREE.BoxGeometry(1,1,1)
    const fmaterial = new THREE.MeshBasicMaterial({ color: 0xFF0F00  })
    const fcube = new THREE.Mesh(fgeometry, fmaterial)
    scene.add(fcube)
}
function setupRenderer()
{
    renderer.shadowMap.enabled = true
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.physicallyCorrectLights = true
    document.body.appendChild( renderer.domElement )
}
function setupControls()
{
    controls.screenSpacePanning = false
    controls.minDistance = 1
    controls.maxDistance = 20
    controls.maxPolarAngle = Math.PI
}
function update() {
    requestAnimationFrame(update)
    controls.update()
    renderer.render( scene, camera )
}