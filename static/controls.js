// import * as THREE from 'three';
const MyPointerLockControls = PointerLockControls
// import { PointerLockControls } from './jsm/controls/PointerLockControls.js';

let camera, scene, renderer, controls;
//
// const objects = [];

// let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();


function init(camera, scene) {

    this.camera = camera
    this.scene = scene
    // camera.position.y = 75;

    controls = new MyPointerLockControls(camera, document.body);

    // const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById('root')

    instructions.addEventListener('click', function () {

        controls.lock();

    });

    // controls.addEventListener( 'lock', function () {
    //
    //     instructions.style.display = 'none';
    //     blocker.style.display = 'none';
    //
    // } );
    //
    // controls.addEventListener( 'unlock', function () {
    //
    //     // blocker.style.display = 'block';
    //     // instructions.style.display = '';
    //
    // } );

    scene.add(controls.getObject());

    const onKeyDown = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    const onKeyUp = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

        }

    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

function animate() {
    const time = performance.now();
    if (controls.isLocked === true) {
        //
        // raycaster.ray.origin.copy( controls.getObject().position );
        // raycaster.ray.origin.y -= 10;
        //
        // const intersections = raycaster.intersectObjects( objects, false );
        //
        // const onObject = intersections.length > 0;

        const delta = (time - prevTime) / 400;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;
        //
        // if ( onObject === true ) {
        //
        //     velocity.y = Math.max( 0, velocity.y );
        //     canJump = true;
        //
        // }

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        //
        // console.log(game.camera.position)
        net.send("move",{name:ui.name,position:game.camera.position})
        // controls.getObject().position.y += ( velocity.y * delta ); // new behavior
        //
        // if ( controls.getObject().position.y < 10 ) {
        //
        //     velocity.y = 0;
        //     controls.getObject().position.y = 10;
        //
        //     canJump = true;
        //
        // }

    }

    prevTime = time;
}
