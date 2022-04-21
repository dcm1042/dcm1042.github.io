import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const scene = new THREE.Scene();

const piece1mat = new THREE.MeshStandardMaterial({color: 0xFFF21F });
const loader = new STLLoader()
var piece1;

loader.load(
    'piece1.stl',
    function (geometry) {
        piece1 = new THREE.Mesh(geometry, piece1mat)
        piece1.position.set(0,0,0);
        piece1.scale.x = 3.5; // SCALE
        piece1.scale.y = 3.5; // SCALE
        piece1.scale.z = 3.5;
        scene.add(piece1)
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

  renderer.render(scene,camera);
}

animate();

