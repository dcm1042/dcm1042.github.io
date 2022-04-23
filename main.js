import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const scene = new THREE.Scene();

const piece1mat = new THREE.MeshStandardMaterial({color: 0xFFF21F });
const loader = new STLLoader()
var piece1 = new THREE.Mesh();

function getCenterPoint(mesh) {
  var geometry = mesh.geometry;
  geometry.computeBoundingBox();
  var center = new THREE.Vector3();
  geometry.boundingBox.getCenter( center );
  mesh.localToWorld( center );
  return center;
}
var pivot = new THREE.Group();
loader.load(
    '3d-assets/piece1.stl',
    function (geometry) {
        
        
        piece1 = new THREE.Mesh(geometry.center(), piece1mat);
       
        piece1.scale.x = 3.5; // SCALE
        piece1.scale.y = 3.5; // SCALE
        piece1.scale.z = 3.5;
        piece1.position.set(4,0,4);
        
        scene.add(piece1);
       // scene.add(pivot);
    } 
);


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1 , 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);



const light = new THREE.PointLight(0xFF0FFF);
light.position.set(25,5,100);

const light2 = new THREE.AmbientLight(0xFFFFFF);


const helper = new THREE.PointLightHelper(light);

function addStar(){
  const sphere = new THREE.SphereGeometry(0.35,24,24);
  const material5 = new THREE.MeshStandardMaterial( {color:0xffffff} );
  const star = new THREE.Mesh(sphere, material5);
  const [x,y,z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100) );
  star.position.set(x*3.5,y*2.5,z-120);
 scene.add(star);

}
Array(300).fill().forEach(addStar);


renderer.render(scene,camera);


scene.add(light, light2,helper)






window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render()
}




function animate(){
  requestAnimationFrame( animate );
  piece1.rotation.y += 0.01
  
  piece1.rotation.z += 0.01
  renderer.render(scene,camera);
}

animate();

