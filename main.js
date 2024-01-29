import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 500 );
camera.position.set(0, 0, 20)
camera.lookAt( 0, 0, 0 );

const directionalLight = new THREE.DirectionalLight(0xc4c4c4, 1);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

/*const material_line = new THREE.LineBasicMaterial({color: 0x0000ff});
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometry_line = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line(geometry_line, material_line)
scene.add(line)*/
renderer.render( scene, camera );

const loader = new GLTFLoader();

let gltf_obj = null
loader.load( '/model/scene.gltf', function ( gltf ) {

    console.log("load gltf success %s", typeof gltf)
    scene.add( gltf.scene );
    gltf_obj = gltf.scene

}, undefined, function ( error ) {

    console.error( error );

} );

// camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if (gltf_obj){
        gltf_obj.rotation.y += 0.01;
    }

    renderer.render( scene, camera );
}

animate();
