import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { Vector3 } from 'three';


const scene = new THREE.Scene();

var piece1mat = new THREE.MeshStandardMaterial({color: 0x30F240 });
var piece2mat = new THREE.MeshStandardMaterial({color: 0x3002F0 });
var piece3mat = new THREE.MeshStandardMaterial({color: 0x30F2F0 });
var piece4mat = new THREE.MeshStandardMaterial({color: 0xFFFF00 });
var piece5mat = new THREE.MeshStandardMaterial({color: 0xFF8F00 });
var chesswhite = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
var chessblack = new THREE.MeshStandardMaterial({color: 0x444444});

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
var piecelist = {piece1:['3d-assets/piece1.stl', piece1mat, 3.5, 10,10 ,Math.floor(Math.random() * 12)], 
                        piece2:['3d-assets/piece3.stl', piece2mat, 3.5, -10, -10,Math.floor(Math.random() * 12)],
                        piece3:['3d-assets/piece5.stl', piece3mat, 3.5, -14, -55,Math.floor(Math.random() * 12)],
                        piece4:['3d-assets/piece6.stl', piece4mat, 3.5, 17, -122,Math.floor(Math.random() * 12)],
                        piece5:['3d-assets/piece3.stl', piece5mat, 3.5, 10, -95,Math.floor(Math.random() * 12)],
                        piece6:['3d-assets/scad_chess_pawn.stl', chessblack, 0.2, -10, -105,Math.floor(Math.random() * 12)],
                        piece7:['3d-assets/scad_chess_pawn.stl', chesswhite, 0.2,15, -30,Math.floor(Math.random() * 12)],
                        piece8:['3d-assets/scad_chess_knight.stl', chessblack, 0.2, -5, -45,Math.floor(Math.random() * 12)],
                        piece9:['3d-assets/scad_chess_king.stl', chesswhite, 0.2, -13, -120,Math.floor(Math.random() * 12)],
                        piece9:['3d-assets/scad_chess_queen.stl', chesswhite, 0.2, 10, -75,Math.floor(Math.random() * 12)]}
for (let model in piecelist){
      loader.load(
        piecelist[model][0],
        function (geometry) {
            var piece = new THREE.Mesh(geometry.center(), piecelist[model][1]);
            piece.scale.x = piecelist[model][2]; // SCALE
            piece.scale.y = piecelist[model][2]; // SCALE
            piece.scale.z = piecelist[model][2];
            piece.position.set(piecelist[model][3],piecelist[model][4],piecelist[model][5]);
            piece.name = model;
            scene.add(piece);
        } 
    );
}

function randV3(){
	return new Vector3(Math.random()/300-(.006*(((parseInt(Math.random()*10)))%2)),Math.random()/300-(.006*(((parseInt(Math.random()*10)))%2)),Math.random()/300-(.006*(((parseInt(Math.random()*10)))%2)));
}

var rotation = {piece1:randV3(), piece2:randV3(), piece3:randV3(),piece4:randV3(),piece5:randV3(),piece6:randV3(),piece7:randV3(),piece8:randV3(),piece9:randV3()};
const light = new THREE.PointLight(0x999999);
light.position.set(25,5,100);

const light2 = new THREE.AmbientLight(0x333333);


const helper = new THREE.PointLightHelper(light);
function addStar(){
		const sphere = new THREE.SphereGeometry(0.58,24,24);
		const material5 = new THREE.MeshStandardMaterial( {color:0xffffff} );
		const star = new THREE.Mesh(sphere, material5);
		const [x,y,z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100) );
		star.position.set(x*5,y*10.5,(-z*2.5)-200);
		scene.add(star);

}
Array(2500).fill().forEach(addStar);


renderer.render(scene,camera);


scene.add(light, light2,helper)






window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render();
}


function scrollAnimation(){
  const pos = document.body.getBoundingClientRect().top;
 // camera.position.x+=Math.sin(camera.rotationy)*3;
  //camera.position.z =pos*0.04 +30;
  camera.position.y =pos*0.04;


}
document.body.onscroll = scrollAnimation
function animate(){
  requestAnimationFrame( animate );
  //pieceone.rotation.z += 0.01
  for(let p in rotation){
	let apple = scene.getObjectByName(p);
	 apple.rotation.x += rotation[p].x;
	 apple.rotation.y += rotation[p].y;
	 apple.rotation.z += rotation[p].z;

  }
  renderer.render(scene,camera);
}

animate();

