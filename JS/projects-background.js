// lookup Mesh.emmisiveMap
import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { Mesh } from "three";

let guiValues;
const mouse = new THREE.Vector2();
const camMovScale = { x: 0.1, y: 0.1, z: 0.1 };

// Variables
let renderScene = true;
let terrainIntensity = 0.5;
const matMetalness = 0.9;
const matRoughness = 0.4;

const alIntensity = 0;
const alColor = new THREE.Color(255 / 255, 255 / 255, 255 / 255);

const sl1Intensity = 40;
const sl1Dist = 20;
const sl1Angle = Math.PI * 0.1;
const sl1Pen = 0.3;
const sl1Color = new THREE.Color(255 / 255, 0 / 255, 169 / 255);
const sl1X = 0;
const sl1Y = 2;
const sl1Z = 2;
const slt1X = 0;
const slt1Y = 1;
const slt1Z = 1;

const sl2Intensity = 40;
const sl2Dist = 20;
const sl2Angle = Math.PI * 0.1;
const sl2Pen = 0.25;
const sl2Color = new THREE.Color(255 / 255, 255 / 255, 255 / 255);
const sl2X = 0;
const sl2Y = -2;
const sl2Z = 0;
const slt2X = 0;
const slt2Y = 0;
const slt2Z = 0;

const camNear = 0.01;
const camFar = 20;
const camFOV = 90;

const rgbShiftIntensity = 0.001;

let speed = 0.15;

const canvas = document.querySelector(".webgl-canvas");
const scene = new THREE.Scene();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const fog = new THREE.Fog("#000000", 1, 2.5);
scene.fog = fog;

const TEXTURE_PATH = "../Assets/Textures/longGridTexture.png";
const DISPLACEMENT_PATH = "../Assets/Textures/longHeightTexture.png";
const METAL_PATH = "../Assets/Textures/longMetalTexture.png";

const textureLoader = new THREE.TextureLoader();
const gridTexture = textureLoader.load(TEXTURE_PATH);
const gridTerrainTexture = textureLoader.load(DISPLACEMENT_PATH);
const gridMetalTexture = textureLoader.load(METAL_PATH);

const gridGeometry = new THREE.PlaneGeometry(1, 2, 11, 35);
const gridMaterial = new THREE.MeshStandardMaterial({
  map: gridTexture,
  displacementMap: gridTerrainTexture,
  displacementScale: terrainIntensity,
  metalnessMap: gridMetalTexture,
  metalness: matMetalness,
  roughness: matRoughness,
});

// GRID TEXTURE vs GRID OBJECT

const gridPlane1a = new THREE.Mesh(gridGeometry, gridMaterial);

gridPlane1a.rotation.x = -Math.PI * 0.5;
gridPlane1a.position.x = 0;
gridPlane1a.position.y = 0.0;
gridPlane1a.position.z = 0.15;

scene.add(gridPlane1a);

const gridPlane1b = new THREE.Mesh(gridGeometry, gridMaterial);

gridPlane1b.rotation.x = -Math.PI * 0.5;
gridPlane1b.position.x = 0;
gridPlane1b.position.y = 0.0;
gridPlane1b.position.z = -1.85;

scene.add(gridPlane1b);

// const gridPlane2a = new THREE.Mesh(gridGeometry, gridMaterial);

// gridPlane2a.rotation.x = -Math.PI * 0.5;
// gridPlane2a.rotation.z = Math.PI;
// gridPlane2a.position.x = 1.0;
// gridPlane2a.position.y = 0.0;
// gridPlane2a.position.z = 0.15;

// scene.add(gridPlane2a);

// const gridPlane2b = new THREE.Mesh(gridGeometry, gridMaterial);

// gridPlane2b.rotation.x = -Math.PI * 0.5;
// gridPlane2b.rotation.z = Math.PI;
// gridPlane2b.position.x = 1.0;
// gridPlane2b.position.y = 0.0;
// gridPlane2b.position.z = -1.85;

// scene.add(gridPlane2b);

calcScale();

// Lights
const ambientLight = new THREE.AmbientLight(alColor, alIntensity);
scene.add(ambientLight);

const spotlight = new THREE.SpotLight(
  sl1Color,
  sl1Intensity,
  sl1Dist,
  sl1Angle,
  sl1Pen
);
spotlight.position.set(sl1X, sl1Y, sl1Z);
spotlight.target.position.set(slt1X, slt1Y, slt1Z);
scene.add(spotlight);
scene.add(spotlight.target);

const spotlight2 = new THREE.SpotLight(
  sl2Color,
  sl2Intensity,
  sl2Dist,
  sl2Angle,
  sl2Pen
);
spotlight2.position.set(sl2X, sl2Y, sl2Z);
spotlight2.target.position.set(slt2X, slt2Y, slt2Z);
scene.add(spotlight2);
scene.add(spotlight2.target);

const camera = new THREE.PerspectiveCamera(
  camFOV, //fov
  size.width / size.height, //Aspec Ratio
  camNear, // Cam Near
  camFar // Cam Far
);

camera.position.x = 0;
camera.position.y = terrainIntensity - 0.1;
camera.position.z = 1;

camera.rotation.x = -Math.PI / 10;
camera.rotation.y = 0;
camera.rotation.z = 0;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  calcScale();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

document.addEventListener("mousemove", (event) => {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Post processing effects
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(size.width, size.height);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);
const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms["amount"].value = rgbShiftIntensity;
effectComposer.addPass(rgbShiftPass);

const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
effectComposer.addPass(gammaCorrectionPass);

const clock = new THREE.Clock();

const tick = () => {
  if (renderScene) {
    const elapsedTime = clock.getElapsedTime();

    gridPlane1a.position.z = (elapsedTime * speed) % 2;
    gridPlane1b.position.z = ((elapsedTime * speed) % 2) - 2;
    // gridPlane2a.position.z = (elapsedTime * speed) % 2;
    // gridPlane2b.position.z = ((elapsedTime * speed) % 2) - 2;

    effectComposer.render();
    window.requestAnimationFrame(tick);
  }
};

function calcScale() {
  // Gradient based scaling wrt screen width
  if (size.width > 1000) {
    camMovScale.x = 0.1;
    camMovScale.y = 0.1;
    gridPlane1a.scale.x = 1;
    gridPlane1b.scale.x = 1;
    // gridPlane2a.scale.x = 1;
    // gridPlane2b.scale.x = 1;
    terrainIntensity = 0.5;
  } else if (size.width < 400) {
    camMovScale.x = 0.05;
    camMovScale.y = 0.05;
    gridPlane1a.scale.x = 0.25;
    gridPlane1b.scale.x = 0.25;
    // gridPlane2a.scale.x = 0.25;
    // gridPlane2b.scale.x = 0.25;
    terrainIntensity = 0.8;
  } else {
    // Gradient: val = start_val*x + end_val*(x-1)
    camMovScale.x = 0.1 * (size.width / 1000) + 0.05 * (size.width / 1000 - 1);
    camMovScale.y = 0.1 * (size.width / 1000) + 0.05 * (size.width / 1000 - 1);
    gridPlane1a.scale.x = size.width / 1000 + 0.25 * (size.width / 1000 - 1);
    gridPlane1b.scale.x = size.width / 1000 + 0.25 * (size.width / 1000 - 1);
    // gridPlane2a.scale.x = size.width / 1000 + 0.25 * (size.width / 1000 - 1);
    // gridPlane2b.scale.x = size.width / 1000 + 0.25 * (size.width / 1000 - 1);
    terrainIntensity =
      0.5 * (size.width / 1000) - 0.8 * (size.width / 1000 - 1);
  }

  if (size.height > 1000) {
    camMovScale.y = 0.1;
  } else if (size.height < 400) {
    camMovScale.y = 0.05;
  } else {
    camMovScale.y =
      0.1 * (size.height / 1000) + 0.05 * (size.height / 1000 - 1);
  }
  gridMaterial.displacementScale = terrainIntensity;
}

let FizzyText = function () {
  // Sets up inital values for the sliders
  this.animation = true;
};

window.onload = function () {
  guiValues = new FizzyText();
  let gui = new dat.GUI();

  let animation = gui.add(guiValues, "animation");
  animation.onChange(function (value) {
    camera.position.x = 0;
    camera.position.y = terrainIntensity - 0.1;
    camera.position.z = 1;

    camera.rotation.x = -Math.PI / 10;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    effectComposer.render();
    if (value) {
      renderScene = true;
      tick();
    } else {
      renderScene = false;
    }
  });
};

tick();
