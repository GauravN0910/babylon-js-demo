# Babylon-JS
To design and run simulations on a virtual environment which can be explored by users in a first person point of view and interact with the environment.
# Instructions for Running
```

git clone https://github.com/GauravN0910/babylon-js-demo.git
npm run dev

```

# Data
The contents of this directory correspond to the blender models and point cloud files which can be used in the 3D environment.

# Controls
```
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

```

# Loading Objects from Blender
```
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
```

# Gaussian Splat Rendering
```
  const gaussianSplat = new BABYLON.GaussianSplattingMesh('testSplat', null, scene);
  gaussianSplat.loadFileAsync('bonsai.ply');
```
