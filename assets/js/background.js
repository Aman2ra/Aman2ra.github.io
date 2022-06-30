import * as THREE from "three";
import { RenderPass } from "RenderPass";
import { EffectComposer } from "EffectComposer";
import { GammaCorrectionShader } from "GammaCorrectionShader";
import { ShaderPass } from "ShaderPass";
import { RGBShiftShader } from "RGBShiftShader";

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

const TEXTURE_PATH = "../assets/images/textures/gridTexture2.png";
const DISPLACEMENT_PATH = "../assets/images/textures/heightTexture2.png";
const METAL_PATH = "../assets/images/textures/metalTexture2.png";

const textureLoader = new THREE.TextureLoader();
const gridTexture = textureLoader.load(TEXTURE_PATH);
const gridTerrainTexture = textureLoader.load(DISPLACEMENT_PATH);
const gridMetalTexture = textureLoader.load(METAL_PATH);

const gridGeometry = new THREE.PlaneGeometry(1, 2, 35, 35);
const gridMaterial = new THREE.MeshStandardMaterial({
  map: gridTexture,
  displacementMap: gridTerrainTexture,
  displacementScale: terrainIntensity,
  metalnessMap: gridMetalTexture,
  metalness: matMetalness,
  roughness: matRoughness,
});

// GRID TEXTURE vs GRID OBJECT

const gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);

gridPlane.rotation.x = -Math.PI * 0.5;
gridPlane.position.y = 0.0;
gridPlane.position.z = 0.15;

const gridPlane2 = new THREE.Mesh(gridGeometry, gridMaterial);

gridPlane2.rotation.x = -Math.PI * 0.5;
gridPlane2.position.y = 0.0;
gridPlane2.position.z = -1.85;
scene.add(gridPlane);
scene.add(gridPlane2);

calcScale();

const SUN_TEXTURE_PATH = "../assets/images/textures/sunTexture.png";
const SUN_METAL_PATH = "../assets/images/textures/sunMetalTexture.png";
const SUN_ROUGHNESS_PATH = "../assets/images/textures/sunRoughnessTexture1.png";

const sunGridTexture = textureLoader.load(SUN_TEXTURE_PATH);
const sunMetalTexture = textureLoader.load(SUN_METAL_PATH);
const sunRoughnessTexture = textureLoader.load(SUN_ROUGHNESS_PATH);

const sunGeometry = new THREE.CircleGeometry(0.35, 60);
const sunMaterial = new THREE.MeshStandardMaterial({
  map: sunGridTexture,
  roughnessMap: sunRoughnessTexture,
  roughness: 0,
});

const sunPlane = new THREE.Mesh(sunGeometry, sunMaterial);

sunPlane.position.x = 0;
sunPlane.position.y = 1.2;
sunPlane.position.z = -0.75;

scene.add(sunPlane);

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
camera.position.y = 0.06;
camera.position.z = 1;

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

    camera.position.x = camMovScale.x * mouse.x;
    camera.rotation.y = camMovScale.x * mouse.x;
    camera.position.y = camMovScale.y * mouse.y + 0.11;
    camera.rotation.x = -camMovScale.y * mouse.y;

    sunPlane.position.x = 0.95 * camMovScale.x * mouse.x;
    sunPlane.position.y = 0.95 * camMovScale.y * mouse.y + 1.2;

    gridPlane.position.z = (elapsedTime * speed) % 2;
    gridPlane2.position.z = ((elapsedTime * speed) % 2) - 2;

    effectComposer.render();
    window.requestAnimationFrame(tick);
  }
};

function calcScale() {
  // Gradient based scaling wrt screen width
  if (size.width > 1000) {
    camMovScale.x = 0.1;
    camMovScale.y = 0.1;
    gridPlane.scale.x = 1;
    gridPlane2.scale.x = 1;
    terrainIntensity = 0.5;
  } else if (size.width < 400) {
    camMovScale.x = 0.05;
    camMovScale.y = 0.05;
    gridPlane.scale.x = 0.25;
    gridPlane2.scale.x = 0.25;
    terrainIntensity = 0.8;
  } else {
    // Gradient: val = start_val*x + end_val*(x-1)
    camMovScale.x = 0.1 * (size.width / 1000) + 0.05 * (size.width / 1000 - 1);
    camMovScale.y = 0.1 * (size.width / 1000) + 0.05 * (size.width / 1000 - 1);
    gridPlane.scale.x = size.width / 1000 + 0.25 * (size.width / 1000 - 1);
    gridPlane2.scale.x = size.width / 1000 + 0.25 * (size.width / 1000 - 1);
    terrainIntensity =
      0.5 * (size.width / 1000) - 0.8 * (size.width / 1000 - 1);
    gridPlane.material.map = gridTexture;
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
    camera.position.y = 0.1;
    camera.position.z = 1;
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    sunPlane.position.x = 0;
    sunPlane.position.y = 1.2;
    sunPlane.position.z = -0.75;
    sunPlane.rotation.x = 0;
    sunPlane.rotation.y = 0;
    sunPlane.rotation.z = 0;
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
