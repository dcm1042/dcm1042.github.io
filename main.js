import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'


const scene = new THREE.Scene();

var piece1mat = new THREE.MeshStandardMaterial({color: 0x30F240 });
var piece2mat = new THREE.MeshStandardMaterial({color: 0x3002F0 });

var loader = new STLLoader();






const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1 , 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

var piece1 = new THREE.Mesh();
loader.load(
    '3d-assets/piece1.stl',
    function (geometry) {
        var piece1 = new THREE.Mesh(geometry.center(), piece1mat);
        piece1.scale.x = 3.5; // SCALE
        piece1.scale.y = 3.5; // SCALE
        piece1.scale.z = 3.5;
        piece1.position.set(-5,0,0);
		piece1.name = "piece1";
		scene.add(piece1);
    } 
);
var piece2 = new THREE.Mesh();
loader.load(
    '3d-assets/piece3.stl',
    function (geometry) {
        piece2 = new THREE.Mesh(geometry.center(), piece2mat);
        piece2.scale.x = 3.5; // SCALE
        piece2.scale.y = 3.5; // SCALE
        piece2.scale.z = 3.5;
        piece2.position.set(9,0,0);
		piece2.name = "piece2";
		scene.add(piece2);
    } 
);
var rotation = {piece1:new THREE.Vector3(Math.random()/100,Math.random()/100,0),piece2:new THREE.Vector3(Math.random()/100,Math.random()/100,Math.random()/100)}
const light = new THREE.PointLight(0x999999);
light.position.set(25,5,100);

const light2 = new THREE.AmbientLight(0x333333);


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






window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render();
}




function animate(){
  requestAnimationFrame( animate );
  //pieceone.rotation.z += 0.01
  for(let p in rotation){
	let apple = scene.getObjectByName(p)

	 apple.rotation.x += rotation[p].x;
	 apple.rotation.y += rotation[p].y;
	 apple.rotation.z += rotation[p].z;

  }
  renderer.render(scene,camera);
}

animate();

