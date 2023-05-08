// Import statements
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create an object for screen sizes
const size = {}
setCanvasSize();

// Create a scene
const scene = new THREE.Scene()

// Create a camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100)

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector(".bg") })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(size.width, size.height)
camera.position.setZ(30)
renderer.render(scene, camera)

// Create a shape
const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshStandardMaterial({ color: 0xEFE9F4})
const box = new THREE.Mesh(geometry, material);
scene.add(box)

// Create a light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(7, 7, 7);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

scene.background = new THREE.Color(0xEA7317)

let animate = () => {
  requestAnimationFrame(animate);

  box.rotation.x += 0.01
  box.rotation.z += 0.01

  renderer.render(scene, camera);
  controls.update();
}

window.onresize = () => {
  // Update the canvas size
  setCanvasSize();
  // Update the camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  // Update the renderer
  renderer.setSize(size.width, size.height)
}

function setCanvasSize() {
  size.width = window.innerWidth
  size.height = window.innerHeight
}

let main = () => {
  setCanvasSize()
  animate();
}

main()

