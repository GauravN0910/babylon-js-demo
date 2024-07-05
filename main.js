import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import {Inspector} from '@babylonjs/inspector';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

const createScene = function (){
  const scene = new BABYLON.Scene(engine);

  const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', {diameter: 0.4}, scene);
  sphere.position = new BABYLON.Vector3(-11, 5, -8);

  scene.onPointerDown = function castRay(){
    const hit = scene.pick(scene.pointerX, scene.pointerY);

    if(hit.pickedMesh && hit.pickedMesh.name=='mySphere'){  
      activeScene = 1;
    } 
  }

  //To lock the pointer to the middle of the screen
  // scene.onPointerDown = (evt) => {
  //   if (evt.button === 0) engine.enterPointerlock();
  //   if (evt.button === 1) engine.exitPointerlock();
  // };

  const framesPerSecond = 60;
  const gravity = -9.81;
  scene.gravity = new BABYLON.Vector3(0, gravity / framesPerSecond, 0);
  scene.collisionsEnabled = true;

  scene.createDefaultLight();
  const camera = new BABYLON.FreeCamera('myCamera', new BABYLON.Vector3(0, 4, 30), scene);
  camera.rotation = new BABYLON.Vector3(0, Math.PI, 0);
  camera.attachControl();
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(0.1, 4, 0.1);
  camera.minZ = 0.45;
  camera.speed = 0.20;
  camera.angularSensibility = 4000;
  camera.keysUp.push(87);
  camera.keysLeft.push(65); 
  camera.keysDown.push(83);
  camera.keysRight.push(68);

  
  const ground = new BABYLON.MeshBuilder.CreateGround('myGround', {width: 100, height: 100}, scene);
  ground.position = new BABYLON.Vector3(0, 1, 0);
  ground.checkCollisions = true;

  BABYLON.SceneLoader.ImportMesh(
    '',
    '/data/',
    'kitchen_assets.glb',
    scene,
    function(meshes, particleSystems, skeletons, animationGroups){
      const model = meshes[0];
      model.scaling = new BABYLON.Vector3(2, 2, 2);
      animationGroups[5].play(true);
      meshes.forEach(mesh => {
        mesh.checkCollisions = true;
      })
    }
  );

  return scene;
}



const createCowScene = function (){
  const scene = new BABYLON.Scene(engine);

  const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', {diameter: 0.4}, scene);
  sphere.position = new BABYLON.Vector3(-12.431244777845018, 3, -1.5438608882048401);

  scene.onPointerDown = function castRay(){
    const hit = scene.pick(scene.pointerX, scene.pointerY);

    if(hit.pickedMesh && hit.pickedMesh.name=='mySphere'){
      activeScene = 0;
    } 
  }

  //To lock the pointer to the middle of the screen
  // scene.onPointerDown = (evt) => {
  //   if (evt.button === 0) engine.enterPointerlock();
  //   if (evt.button === 1) engine.exitPointerlock();
  // };

  const framesPerSecond = 60;
  const gravity = -9.81;
  scene.gravity = new BABYLON.Vector3(0, gravity / framesPerSecond, 0);
  scene.collisionsEnabled = true;

  scene.createDefaultLight();
  const camera = new BABYLON.FreeCamera('myCamera', new BABYLON.Vector3(0, 2, 30), scene);
  camera.rotation = new BABYLON.Vector3(0, Math.PI, 0);
  camera.attachControl();
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(0.1, 1, 0.1);
  camera.minZ = 0.45;
  camera.speed = 0.20;
  camera.angularSensibility = 4000;
  camera.keysUp.push(87);
  camera.keysLeft.push(65);
  camera.keysDown.push(83);
  camera.keysRight.push(68);

  
  const ground = new BABYLON.MeshBuilder.CreateGround('myGround', {width: 100, height: 100}, scene);
  ground.checkCollisions = true;

  BABYLON.SceneLoader.ImportMesh(
    '',
    '/data/',
    'house_with_interior.glb',
    scene,
    function(meshes, particleSystems, skeletons, animationGroups){
      const model = meshes[0];
      model.scaling = new BABYLON.Vector3(2, 2, 2);

      animationGroups[5].play(true);
      meshes.forEach(mesh => {
        mesh.checkCollisions = true;
      })
    }
  );

  return scene;
}

const scene = createScene();
const cowScene = createCowScene();

const scenes = [scene, cowScene];

let activeScene = 0;


engine.runRenderLoop(function(){
  scenes[activeScene].render();
});

window.addEventListener('resize', function(){
  engine.resize();
})

Inspector.Show(scene, {});d